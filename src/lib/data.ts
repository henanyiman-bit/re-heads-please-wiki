import { importWikiDataset } from "./importData";
import { validateDataset } from "./validateData";

export type WikiCategory = "items" | "coins" | "accessories";

export interface WikiEntry {
  name: string;
  slug: string;
  value: string;
  rarity: string;
  description: string;
  howToGet: string;
  verified: boolean;
  verifiedAt: string;
  updatedAt: string;
  keywords: string[];
  relatedSlugs: string[];
  tier?: string;
  location?: string;
  image?: string;
  source?: string;
}

export interface ItemEntry extends WikiEntry {
  tier: string;
  location: string;
  image: string;
}

export interface CoinEntry extends WikiEntry { source: string; }
export interface AccessoryEntry extends WikiEntry { tier: string; }

export interface CategoryEntry {
  name: string;
  slug: string;
  description: string;
  status: string;
}

export interface WikiImageEntry {
  slug: string;
  type: string;
  prompt: string;
  alt: string;
}

const datasets: Record<WikiCategory, unknown[]> = {
  items: importWikiDataset("items"),
  coins: importWikiDataset("coins"),
  accessories: importWikiDataset("accessories"),
};

const entryCache = new Map<WikiCategory, WikiEntry[]>();

export function createSlug(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function stringField(record: Record<string, unknown>, field: string): string {
  return typeof record[field] === "string" ? record[field].trim() : "";
}

function stringArrayField(record: Record<string, unknown>, field: string): string[] {
  return Array.isArray(record[field])
    ? record[field].filter((value): value is string => typeof value === "string").map((value) => value.trim())
    : [];
}

function normalizeEntry(category: WikiCategory, unknownRecord: unknown): WikiEntry {
  const record = unknownRecord as Record<string, unknown>;
  const common = {
    name: stringField(record, "name"),
    slug: stringField(record, "slug") || createSlug(stringField(record, "name")),
    value: stringField(record, "value"),
    rarity: stringField(record, "rarity"),
    description: stringField(record, "description"),
    howToGet: stringField(record, "howToGet"),
    verified: record.verified === true,
    verifiedAt: stringField(record, "verifiedAt"),
    updatedAt: stringField(record, "updatedAt"),
    keywords: stringArrayField(record, "keywords"),
    relatedSlugs: stringArrayField(record, "relatedSlugs"),
    image: stringField(record, "image"),
  };

  if (category === "items") {
    return { ...common, tier: stringField(record, "tier"), location: stringField(record, "location") } as ItemEntry;
  }
  if (category === "coins") {
    return { ...common, source: stringField(record, "source") } as CoinEntry;
  }
  return { ...common, tier: stringField(record, "tier") } as AccessoryEntry;
}

export function getEntries(category: WikiCategory): WikiEntry[] {
  const cached = entryCache.get(category);
  if (cached) return cached;

  const records = datasets[category];
  validateDataset(category, records);
  const entries = records.map((record) => normalizeEntry(category, record));
  const generatedSlugs = new Set<string>();

  for (const entry of entries) {
    if (!entry.slug) throw new Error(`[wiki-data] ${category} entry "${entry.name}" has no usable slug.`);
    if (generatedSlugs.has(entry.slug)) throw new Error(`[wiki-data] Duplicate generated ${category} slug: "${entry.slug}".`);
    generatedSlugs.add(entry.slug);
  }

  entryCache.set(category, entries);
  return entries;
}

export const getItems = () => getEntries("items") as ItemEntry[];
export const getCoins = () => getEntries("coins") as CoinEntry[];
export const getAccessories = () => getEntries("accessories") as AccessoryEntry[];

export function getCategories(): CategoryEntry[] {
  const records = importWikiDataset("categories");
  validateDataset("categories", records);
  return records.map((record) => ({
    name: stringField(record, "name"),
    slug: stringField(record, "slug"),
    description: stringField(record, "description"),
    status: stringField(record, "status"),
  }));
}

export function getImages(): WikiImageEntry[] {
  const records = importWikiDataset("images");
  validateDataset("images", records);
  return records.map((record) => ({
    slug: stringField(record, "slug"),
    type: stringField(record, "type"),
    prompt: stringField(record, "prompt"),
    alt: stringField(record, "alt"),
  }));
}

export function getImageForEntry(category: WikiCategory, slug: string): WikiImageEntry | undefined {
  const type = category === "items" ? "item" : category === "coins" ? "coin" : "accessory";
  return getImages().find((image) => image.type === type && image.slug === slug);
}

export function getEntryPath(category: WikiCategory, entry: Pick<WikiEntry, "slug">): string {
  return `/${category}/${entry.slug}`;
}

export function getRelatedEntries(category: WikiCategory, current: WikiEntry, limit = 3): WikiEntry[] {
  const entries = getEntries(category);
  const explicitOrder = new Map(current.relatedSlugs.map((slug, index) => [slug, index]));
  return entries
    .filter((entry) => entry.slug !== current.slug)
    .map((entry, index) => ({
      entry,
      index,
      explicitIndex: explicitOrder.get(entry.slug),
      score: Number(Boolean(current.tier && entry.tier === current.tier)) + Number(Boolean(current.rarity && entry.rarity === current.rarity)),
    }))
    .sort((a, b) => {
      if (a.explicitIndex !== undefined || b.explicitIndex !== undefined) {
        if (a.explicitIndex === undefined) return 1;
        if (b.explicitIndex === undefined) return -1;
        return a.explicitIndex - b.explicitIndex;
      }
      return b.score - a.score || a.index - b.index;
    })
    .slice(0, limit)
    .map(({ entry }) => entry);
}

export function getRelatedGuides(category: WikiCategory): { href: string; label: string }[] {
  if (category === "coins") return [{ href: "/guides/farming-guide", label: "Farming Guide" }, { href: "/guides/progression-guide", label: "Progression Guide" }];
  if (category === "accessories") return [{ href: "/guides/game-mechanics", label: "Game Mechanics" }, { href: "/guides/tips-and-tricks", label: "Tips and Tricks" }];
  return [{ href: "/guides/beginner-guide", label: "Beginner Guide" }, { href: "/guides/game-mechanics", label: "Game Mechanics" }];
}
