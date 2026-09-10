type AdKind = 'leaderboard' | 'rectangle' | 'mobile' | 'native';

type AdUnit = {
  key: string;
  width: number;
  height: number;
};

declare global {
  interface Window {
    atOptions?: Record<string, unknown>;
  }
}

const PRODUCTION_HOST = 'reheadsplease.ymmyi.wiki';
const AD_DOMAIN = 'https://harryinspectionlucy.com';
const NATIVE_KEY = '8f46fc5471982f65cf6699c9c8c7f570';
const NATIVE_CONTAINER_ID = `container-${NATIVE_KEY}`;

const units: Record<Exclude<AdKind, 'native'>, AdUnit> = {
  leaderboard: { key: '1cedd62e0b7e30a8b9a19134ca4b86db', width: 728, height: 90 },
  rectangle: { key: '61ccf78324875a71dd5e818673cd405a', width: 300, height: 250 },
  mobile: { key: '8a62b62c6204f4852d7ec286320bc5a7', width: 320, height: 50 },
};

const slotSizes: Record<AdKind, [number, number]> = {
  leaderboard: [728, 90],
  rectangle: [300, 250],
  mobile: [320, 50],
  native: [640, 320],
};

function contentRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    '.detail-content, .article-main, .hub-main, .wiki-content, .article-shell, #main-content article',
  );
}

function pageWordCount(root: HTMLElement): number {
  const copy = root.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('nav, aside, script, style, .ad-slot, .wiki-sidebar').forEach((node) => node.remove());
  return (copy.textContent ?? '').trim().split(/\s+/u).filter(Boolean).length;
}

function allowedAds(wordCount: number, isHome: boolean): number {
  if (isHome || wordCount < 500) return 1;
  if (wordCount < 900) return 2;
  return 3;
}

function baseSlot(kind: AdKind): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.ad-slot[data-adsterra="${kind}"]`);
}

function resetSlot(slot: HTMLElement, kind: AdKind): HTMLElement {
  const [width, height] = slotSizes[kind];
  slot.className = `ad-slot ad-slot--${kind}`;
  slot.dataset.adsterra = kind;
  slot.removeAttribute('data-ad-selected');
  slot.removeAttribute('data-ad-loaded');
  slot.setAttribute('style', `--ad-width:${width}px;--ad-height:${height}px`);
  const mount = slot.querySelector<HTMLElement>('.ad-mount');
  if (mount) mount.replaceChildren();
  return slot;
}

function makeSlot(kind: AdKind): HTMLElement | null {
  const template = baseSlot(kind);
  return template ? resetSlot(template.cloneNode(true) as HTMLElement, kind) : null;
}

function safeBoundaries(root: HTMLElement): HTMLElement[] {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>('h2')).map((heading) =>
    heading.parentElement?.tagName === 'SECTION' ? heading.parentElement : heading,
  );
  return [...new Set(candidates)].filter((node) => {
    if (node.closest('aside, nav, .quick-answer, .faq, [data-faq], .related-pages, table')) return false;
    const text = node.matches('h2') ? node.textContent ?? '' : node.querySelector('h2')?.textContent ?? '';
    return !/faq|related|quick answer/i.test(text);
  });
}

function boundaryAt(boundaries: HTMLElement[], ratio: number): HTMLElement | null {
  if (!boundaries.length) return null;
  const index = Math.min(boundaries.length - 1, Math.max(0, Math.round((boundaries.length - 1) * ratio)));
  return boundaries[index];
}

function placeBefore(slot: HTMLElement | null, boundary: HTMLElement | null): HTMLElement | null {
  if (!slot || !boundary?.parentElement) return null;
  boundary.parentElement.insertBefore(slot, boundary);
  return slot;
}

function placeAtEnd(slot: HTMLElement | null, root: HTMLElement): HTMLElement | null {
  if (!slot) return null;
  const lateHeading = Array.from(root.querySelectorAll<HTMLElement>('h2')).find((node) => /faq|related/i.test(node.textContent ?? ''));
  const lateBoundary = lateHeading?.parentElement?.tagName === 'SECTION' ? lateHeading.parentElement : lateHeading;
  if (lateBoundary?.parentElement) lateBoundary.parentElement.insertBefore(slot, lateBoundary);
  else root.append(slot);
  return slot;
}

function preparePlacements(root: HTMLElement, maximum: number, viewport: number, isHome: boolean): HTMLElement[] {
  document.querySelectorAll<HTMLElement>('.ad-slot').forEach((slot) => {
    slot.removeAttribute('data-ad-selected');
    slot.removeAttribute('data-ad-loaded');
    slot.querySelector('.ad-mount')?.replaceChildren();
  });

  const boundaries = safeBoundaries(root);
  const first = boundaryAt(boundaries, isHome ? 0.72 : 0.3);
  const second = boundaries.length >= 4 ? boundaryAt(boundaries, 0.65) : null;
  const placements: Array<HTMLElement | null> = [];

  if (isHome) {
    const kind: AdKind = viewport >= 1024 ? 'leaderboard' : viewport >= 768 ? 'rectangle' : 'mobile';
    placements.push(placeBefore(makeSlot(kind), first) ?? placeAtEnd(makeSlot(kind), root));
    return placements.filter((slot): slot is HTMLElement => Boolean(slot)).slice(0, 1);
  }

  const sidebar = document.querySelector<HTMLElement>('.wiki-sidebar .ad-slot[data-adsterra="rectangle"], .hub-sidebar .ad-slot[data-adsterra="rectangle"], .article-sidebar .ad-slot[data-adsterra="rectangle"], .detail-sidebar .ad-slot[data-adsterra="rectangle"]');

  if (viewport >= 1024 && sidebar) {
    placements.push(resetSlot(sidebar, 'rectangle'));
    if (maximum >= 2) placements.push(placeBefore(makeSlot('leaderboard'), boundaryAt(boundaries, 0.5)));
  } else {
    const kind: AdKind = viewport >= 1024 ? 'leaderboard' : viewport >= 768 ? 'rectangle' : 'mobile';
    placements.push(placeBefore(makeSlot(kind), first) ?? placeAtEnd(makeSlot(kind), root));
    if (maximum >= 2 && second && second !== first) placements.push(placeBefore(makeSlot(kind), second));
  }

  if (maximum >= 3) placements.push(placeAtEnd(makeSlot('native'), root));
  return placements.filter((slot): slot is HTMLElement => Boolean(slot)).slice(0, maximum);
}

function loadStatic(slot: HTMLElement, kind: Exclude<AdKind, 'native'>): Promise<void> {
  const unit = units[kind];
  const mount = slot.querySelector<HTMLElement>('.ad-mount');
  if (!mount) return Promise.resolve();

  window.atOptions = {
    key: unit.key,
    format: 'iframe',
    height: unit.height,
    width: unit.width,
    params: {},
  };

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `${AD_DOMAIN}/${unit.key}/invoke.js`;
    script.dataset.cfasync = 'false';
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    mount.append(script);
  });
}

function loadNative(slot: HTMLElement): Promise<void> {
  const mount = slot.querySelector<HTMLElement>('.ad-mount');
  if (!mount || document.getElementById(NATIVE_CONTAINER_ID)) return Promise.resolve();

  const script = document.createElement('script');
  script.src = `${AD_DOMAIN}/${NATIVE_KEY}/invoke.js`;
  script.async = true;
  script.dataset.cfasync = 'false';
  const container = document.createElement('div');
  container.id = NATIVE_CONTAINER_ID;
  mount.append(script, container);
  return Promise.resolve();
}

async function loadSlot(slot: HTMLElement): Promise<void> {
  if (slot.dataset.adLoaded === 'true') return;
  const kind = slot.dataset.adsterra as AdKind;
  slot.dataset.adSelected = 'true';
  slot.dataset.adLoaded = 'true';
  if (kind === 'native') await loadNative(slot);
  else await loadStatic(slot, kind);
}

export async function initializeAds(): Promise<void> {
  if (window.location.hostname !== PRODUCTION_HOST) return;
  const marker = document.documentElement;
  if (marker.dataset.adsterraInitializing === 'true' || marker.dataset.adsterraReady === 'true') return;

  const root = contentRoot();
  if (!root) return;
  marker.dataset.adsterraInitializing = 'true';

  try {
    const isHome = window.location.pathname === '/';
    const maximum = allowedAds(pageWordCount(root), isHome);
    const placements = preparePlacements(root, maximum, window.innerWidth, isHome);
    placements.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    for (const slot of placements) await loadSlot(slot);
    marker.dataset.adsterraReady = 'true';
  } finally {
    delete marker.dataset.adsterraInitializing;
  }
}
