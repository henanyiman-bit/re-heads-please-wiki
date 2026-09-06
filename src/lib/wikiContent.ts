import { getCollection, type CollectionEntry } from "astro:content";

export type WikiArticleEntry = CollectionEntry<"wikiArticles">;

let entriesPromise: Promise<WikiArticleEntry[]> | undefined;

export function getWikiArticleEntries(): Promise<WikiArticleEntry[]> {
  entriesPromise ??= getCollection("wikiArticles");
  return entriesPromise;
}

export async function getWikiArticleEntry(
  category: string,
  slug: string,
): Promise<WikiArticleEntry | undefined> {
  const entries = await getWikiArticleEntries();
  return entries.find((entry) => entry.id === `${category}/${slug}`);
}

export function isArticleEntry(entry: WikiArticleEntry | undefined): boolean {
  return Boolean(entry && entry.data.slug !== "index" && entry.data.tags.includes("priority-1"));
}
