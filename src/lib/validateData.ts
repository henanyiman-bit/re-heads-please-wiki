export type ValidatedCategory = "items" | "coins" | "accessories" | "categories" | "images" | "videos";

export interface DataWarning {
  category: ValidatedCategory;
  index: number;
  field: string;
  message: string;
}

export const DESCRIPTION_MIN_LENGTH = 50;
export const DESCRIPTION_MAX_LENGTH = 320;

const requiredFields: Record<ValidatedCategory, readonly string[]> = {
  items: [
    "name", "slug", "rarity", "value", "tier", "description", "location", "howToGet", "image",
    "verified", "verifiedAt", "updatedAt", "keywords", "relatedSlugs",
  ],
  coins: [
    "name", "slug", "value", "rarity", "source", "description", "howToGet",
    "image", "verified", "verifiedAt", "updatedAt", "keywords", "relatedSlugs",
  ],
  accessories: [
    "name", "slug", "rarity", "value", "tier", "description", "howToGet",
    "image", "verified", "verifiedAt", "updatedAt", "keywords", "relatedSlugs",
  ],
  categories: ["name", "slug", "description", "status"],
  images: ["slug", "type", "prompt", "alt"],
  videos: ["slug", "category", "title", "youtubeId", "description", "relatedSlug"],
};

const databaseCategories = new Set<ValidatedCategory>(["items", "coins", "accessories"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function assertString(record: Record<string, unknown>, category: ValidatedCategory, index: number, field: string): string {
  const value = record[field];
  if (typeof value !== "string") {
    throw new Error(`[wiki-data] ${category}[${index}].${field} must be a string.`);
  }
  return value.trim();
}

function assertStringArray(record: Record<string, unknown>, category: ValidatedCategory, index: number, field: string): string[] {
  const value = record[field];
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string" || !entry.trim())) {
    throw new Error(`[wiki-data] ${category}[${index}].${field} must be an array of non-empty strings.`);
  }
  const normalized = value.map((entry) => entry.trim());
  if (new Set(normalized).size !== normalized.length) {
    throw new Error(`[wiki-data] ${category}[${index}].${field} contains duplicate values.`);
  }
  return normalized;
}

function assertISODate(value: string, category: ValidatedCategory, index: number, field: string, allowEmpty = false): void {
  if (allowEmpty && !value) return;
  if (!isoDatePattern.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error(`[wiki-data] ${category}[${index}].${field} must use a valid YYYY-MM-DD date.`);
  }
}

export function validateDataset(category: ValidatedCategory, records: unknown[]): DataWarning[] {
  const warnings: DataWarning[] = [];
  const sourceSlugs = new Map<string, number>();

  records.forEach((unknownRecord, index) => {
    if (!unknownRecord || typeof unknownRecord !== "object" || Array.isArray(unknownRecord)) {
      throw new Error(`[wiki-data] ${category}[${index}] must be a JSON object.`);
    }

    const record = unknownRecord as Record<string, unknown>;
    for (const field of requiredFields[category]) {
      if (!Object.hasOwn(record, field)) {
        throw new Error(`[wiki-data] ${category}[${index}] is missing required field "${field}".`);
      }
    }

    const slug = assertString(record, category, index, "slug").toLowerCase();
    if (!slug || !slugPattern.test(slug)) {
      throw new Error(`[wiki-data] ${category}[${index}].slug must use lowercase kebab-case.`);
    }
    const firstIndex = sourceSlugs.get(slug);
    if (firstIndex !== undefined) {
      throw new Error(`[wiki-data] Duplicate ${category} slug "${slug}" at indexes ${firstIndex} and ${index}.`);
    }
    sourceSlugs.set(slug, index);

    if (category === "images") {
      for (const field of ["type", "prompt", "alt"] as const) {
        if (!assertString(record, category, index, field)) {
          throw new Error(`[wiki-data] ${category}[${index}].${field} cannot be empty.`);
        }
      }
      return;
    }

    if (category === "videos") {
      for (const field of ["category", "title", "youtubeId", "description", "relatedSlug"] as const) {
        if (!assertString(record, category, index, field)) {
          throw new Error(`[wiki-data] ${category}[${index}].${field} cannot be empty.`);
        }
      }
      const youtubeId = assertString(record, category, index, "youtubeId");
      if (!/^[A-Za-z0-9_-]{11}$/.test(youtubeId)) {
        throw new Error(`[wiki-data] ${category}[${index}].youtubeId must be an 11-character YouTube video ID.`);
      }
      const title = assertString(record, category, index, "title");
      if (!title.startsWith("RE:Heads, Please!") || !title.endsWith("Guide")) {
        throw new Error(`[wiki-data] ${category}[${index}].title must follow "RE:Heads, Please! + keyword + Guide".`);
      }
      return;
    }

    const name = assertString(record, category, index, "name");
    if (!name) throw new Error(`[wiki-data] ${category}[${index}].name cannot be empty.`);

    if (category === "categories") {
      for (const field of ["description", "status"] as const) assertString(record, category, index, field);
      return;
    }

    if (!databaseCategories.has(category)) return;

    const stringFields = category === "items"
      ? ["rarity", "value", "tier", "location", "image"]
      : category === "coins"
        ? ["rarity", "value", "source", "image"]
        : ["rarity", "value", "tier", "image"];
    for (const field of stringFields) assertString(record, category, index, field);

    const description = assertString(record, category, index, "description");
    if (description.length < DESCRIPTION_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH) {
      throw new Error(
        `[wiki-data] ${category}[${index}].description must be ${DESCRIPTION_MIN_LENGTH}-${DESCRIPTION_MAX_LENGTH} characters (received ${description.length}).`,
      );
    }

    if (!assertString(record, category, index, "howToGet")) {
      throw new Error(`[wiki-data] ${category}[${index}].howToGet cannot be empty.`);
    }

    const verified = record.verified;
    if (typeof verified !== "boolean") {
      throw new Error(`[wiki-data] ${category}[${index}].verified must be true or false.`);
    }

    const verifiedAt = assertString(record, category, index, "verifiedAt");
    const updatedAt = assertString(record, category, index, "updatedAt");
    assertISODate(updatedAt, category, index, "updatedAt");
    assertISODate(verifiedAt, category, index, "verifiedAt", !verified);
    if (verified && !verifiedAt) {
      throw new Error(`[wiki-data] ${category}[${index}].verifiedAt is required when verified is true.`);
    }

    const keywords = assertStringArray(record, category, index, "keywords");
    if (keywords.length === 0) {
      throw new Error(`[wiki-data] ${category}[${index}].keywords must include at least one keyword.`);
    }

    const relatedSlugs = assertStringArray(record, category, index, "relatedSlugs");
    for (const relatedSlug of relatedSlugs) {
      if (!slugPattern.test(relatedSlug)) {
        throw new Error(`[wiki-data] ${category}[${index}].relatedSlugs contains invalid slug "${relatedSlug}".`);
      }
      if (relatedSlug === slug) {
        throw new Error(`[wiki-data] ${category}[${index}].relatedSlugs cannot reference its own slug.`);
      }
    }
  });

  return warnings;
}
