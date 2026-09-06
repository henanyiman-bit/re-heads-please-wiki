import { importWikiDataset } from "./importData";
import { validateDataset } from "./validateData";

export interface WikiVideo {
  slug: string;
  category: string;
  title: string;
  youtubeId: string;
  description: string;
  relatedSlug: string;
}

let videoCache: WikiVideo[] | undefined;

export function getVideos(): WikiVideo[] {
  if (videoCache) return videoCache;
  const records = importWikiDataset<WikiVideo>("videos");
  validateDataset("videos", records);
  videoCache = records;
  return records;
}

export function getVideosForPage(category: string, relatedSlug: string): WikiVideo[] {
  return getVideos().filter((video) => video.category === category && video.relatedSlug === relatedSlug);
}
