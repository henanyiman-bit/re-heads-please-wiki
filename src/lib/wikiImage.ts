export interface OptimizedWikiImageSources {
  avif?: string;
  webp?: string;
  fallback: string;
}

const WIKI_PNG_PATTERN = /^(\/images\/wiki\/.+)\.png$/i;

export function getOptimizedWikiImageSources(src: string): OptimizedWikiImageSources {
  const match = src.match(WIKI_PNG_PATTERN);

  if (!match) {
    return { fallback: src };
  }

  return {
    avif: `${match[1]}.avif`,
    webp: `${match[1]}.webp`,
    fallback: src,
  };
}

export function getOptimizedWikiSocialImage(src: string): string {
  const match = src.match(WIKI_PNG_PATTERN);
  return match ? `${match[1]}.og.webp` : src;
}
