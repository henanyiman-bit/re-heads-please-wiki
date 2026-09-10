type BannerKind = 'leaderboard' | 'rectangle' | 'mobile';
type AdKind = BannerKind | 'native';

const productionHostname = 'reheadsplease.ymmyi.wiki';
const antiAdblockDomain = 'https://harryinspectionlucy.com';
const units = {
  leaderboard: { key: '1cedd62e0b7e30a8b9a19134ca4b86db', width: 728, height: 90 },
  rectangle: { key: '61ccf78324875a71dd5e818673cd405a', width: 300, height: 250 },
  mobile: { key: '8a62b62c6204f4852d7ec286320bc5a7', width: 320, height: 50 },
  native: { key: '8f46fc5471982f65cf6699c9c8c7f570', width: 640, height: 320 },
} as const;

declare global {
  interface Window {
    atOptions?: { key: string; format: 'iframe'; height: number; width: number; params: Record<string, never> };
  }
}

export const isAdsterraProductionHost = (hostname: string) => hostname === productionHostname;

const slotFor = (kind: AdKind) => document.querySelector<HTMLElement>(`[data-adsterra="${kind}"]`);

const selectUnit = (): { kind: AdKind; slot: HTMLElement } | null => {
  if (matchMedia('(min-width: 1024px)').matches) {
    const sidebar = slotFor('rectangle');
    if (sidebar) return { kind: 'rectangle', slot: sidebar };
    const leaderboard = slotFor('leaderboard');
    return leaderboard ? { kind: 'leaderboard', slot: leaderboard } : null;
  }
  if (matchMedia('(min-width: 768px)').matches) {
    const native = slotFor('native');
    return native ? { kind: 'native', slot: native } : null;
  }
  const mobile = slotFor('mobile');
  return mobile ? { kind: 'mobile', slot: mobile } : null;
};

export function initializeAds() {
  if (!isAdsterraProductionHost(window.location.hostname) || document.querySelector('[data-adsterra-loaded]')) return;

  const selected = selectUnit();
  if (!selected) return;

  const { kind, slot } = selected;
  const unit = units[kind];
  const mount = slot.querySelector<HTMLElement>('.ad-mount')!;
  slot.dataset.adSelected = '';
  slot.dataset.adsterraLoaded = '';

  if (kind === 'native') {
    const container = document.createElement('div');
    container.id = `container-${unit.key}`;
    mount.append(container);
  } else {
    window.atOptions = { key: unit.key, format: 'iframe', height: unit.height, width: unit.width, params: {} };
  }

  const invoke = document.createElement('script');
  invoke.dataset.cfasync = 'false';
  invoke.src = `${antiAdblockDomain}/${unit.key}/invoke.js`;
  invoke.async = kind === 'native';
  mount.append(invoke);
}
