export type AdPosition = "content-top" | "content-middle" | "content-bottom" | "sidebar";

export const adsConfig = {
  enabled: import.meta.env.PUBLIC_ADSENSE_ENABLED === "true",
  clientId: import.meta.env.PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "",
  slots: {
    "content-top": import.meta.env.PUBLIC_ADSENSE_SLOT_CONTENT_TOP?.trim() ?? "",
    "content-middle": import.meta.env.PUBLIC_ADSENSE_SLOT_CONTENT_MIDDLE?.trim() ?? "",
    "content-bottom": import.meta.env.PUBLIC_ADSENSE_SLOT_CONTENT_BOTTOM?.trim() ?? "",
    sidebar: import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR?.trim() ?? "",
  } satisfies Record<AdPosition, string>,
} as const;

export const adsenseReady = Boolean(
  adsConfig.enabled
  && /^ca-pub-\d+$/.test(adsConfig.clientId)
  && Object.values(adsConfig.slots).some(Boolean),
);
