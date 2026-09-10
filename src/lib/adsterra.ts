// Each vendor runs in its own opaque-origin document, never in the Wiki window.
const units = {
  leaderboard: { key: '1cedd62e0b7e30a8b9a19134ca4b86db', width: 728, height: 90, media: '(min-width: 1024px)' },
  rectangle: { key: '61ccf78324875a71dd5e818673cd405a', width: 300, height: 250, media: '(min-width: 1024px)' },
  mobile: { key: '8a62b62c6204f4852d7ec286320bc5a7', width: 320, height: 50, media: '(max-width: 767px)' },
  native: { key: '8f46fc5471982f65cf6699c9c8c7f570', width: 640, height: 320, media: '(min-width: 768px) and (max-width: 1023px)' },
};
let cleanup: (() => void) | undefined;
export function initializeAds() {
  cleanup?.();
  // Local QA only: no analytics endpoint, no production measurement or transmission.
  if (import.meta.env.DEV && !document.documentElement.dataset.adQaCls) {
    document.documentElement.dataset.adQaCls = '0';
    try {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
          if (!entry.hadRecentInput) document.documentElement.dataset.adQaCls = String(Number(document.documentElement.dataset.adQaCls) + entry.value);
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch { /* Layout Shift API is not available in every browser. */ }
  }
  const seen = new Set<string>();
  const disposers: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('[data-adsterra]').forEach((slot) => {
    const kind = slot.dataset.adsterra as keyof typeof units;
    if (!units[kind] || seen.has(kind)) { slot.remove(); return; }
    seen.add(kind);
    const unit = units[kind];
    const media = matchMedia(unit.media);
    const mount = slot.querySelector<HTMLElement>('.ad-mount')!;
    let near = false;
    let frame = mount.querySelector('iframe');
    let loaded = Boolean(frame);
    const update = () => {
      if (!media.matches) {
        // Stop hidden units on breakpoint changes, including their network activity.
        frame?.remove(); frame = null;
        return;
      }
      if (!near || loaded || mount.clientWidth < unit.width || !slot.getClientRects().length) return;
      loaded = true;
      frame = document.createElement('iframe');
      frame.title = `Advertisement — ${kind}`;
      frame.width = String(unit.width); frame.height = String(unit.height);
      frame.loading = 'lazy';
      frame.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');
      frame.style.cssText = 'display:block;border:0;width:100%;height:100%;margin:0 auto';
      slot.dataset.adStatus = 'requested';
      const status = (event: MessageEvent) => {
        if (event.source !== frame?.contentWindow || event.data?.kind !== 'wiki-ad-status') return;
        if (['ready', 'script-loaded', 'script-error', 'runtime-error', 'content-detected'].includes(event.data.status)) {
          slot.dataset.adStatus = event.data.status;
        }
      };
      window.addEventListener('message', status);
      disposers.push(() => window.removeEventListener('message', status));
      const body = kind === 'native'
        ? `<div id="container-${unit.key}"></div><script async data-cfasync="false" src="https://pl31269990.profitableratecpmnetwork.com/${unit.key}/invoke.js"><\/script>`
        : `<script>window.atOptions=${JSON.stringify({ key: unit.key, format: 'iframe', height: unit.height, width: unit.width, params: {} })};<\/script><script src="https://www.highrevenueformat.com/${unit.key}/invoke.js"><\/script>`;
      const diagnostics = `<script>
        const report = status => parent.postMessage({kind:'wiki-ad-status',status}, '*');
        report('ready');
        addEventListener('error', event => report(event.target instanceof HTMLScriptElement ? 'script-error' : 'runtime-error'), true);
        addEventListener('load', event => { if(event.target instanceof HTMLScriptElement && event.target.src) report('script-loaded'); }, true);
        new MutationObserver(() => { if(document.querySelector('iframe,img,a')) report('content-detected'); }).observe(document.documentElement,{childList:true,subtree:true});
      <\/script>`;
      frame.srcdoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;width:100%;min-height:100%;}body{overflow:${kind === 'native' ? 'auto' : 'hidden'};}img,iframe{max-width:100%;}</style>${diagnostics}</head><body>${body}</body></html>`;
      mount.append(frame);
    };
    const intersection = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; update(); }, { rootMargin: '100px' });
    const resize = new ResizeObserver(update);
    intersection.observe(slot); resize.observe(mount);
    media.addEventListener('change', update);
    disposers.push(() => { intersection.disconnect(); resize.disconnect(); media.removeEventListener('change', update); });
  });
  cleanup = () => disposers.forEach(dispose => dispose());
}
