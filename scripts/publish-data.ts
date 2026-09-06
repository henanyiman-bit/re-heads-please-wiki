import { existsSync } from "node:fs";
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateDataset } from "../src/lib/validateData.ts";

const categories = ["items", "coins", "accessories"] as const;
type PublishCategory = typeof categories[number];
type DraftRecord = Record<string, unknown> & {
  slug: string;
  verified: boolean;
  relatedSlugs: string[];
  image?: string;
};
type ImageRecord = Record<string, unknown> & {
  slug: string;
  type: string;
  prompt: string;
  alt: string;
};

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const wikiDirectory = path.join(projectRoot, "src", "content", "wiki");
const draftDirectory = path.join(wikiDirectory, "draft");

async function readJSONArray(filePath: string): Promise<Record<string, unknown>[]> {
  const parsed: unknown = JSON.parse(await readFile(filePath, "utf8"));
  if (!Array.isArray(parsed)) {
    throw new Error(`[publish-data] ${filePath} must contain a JSON array.`);
  }
  return parsed as Record<string, unknown>[];
}

function selectVerified(category: PublishCategory, records: Record<string, unknown>[]): DraftRecord[] {
  validateDataset(category, records);
  return records.filter((record) => record.verified === true) as DraftRecord[];
}

export function validateRelatedSlugs(recordsByCategory: Record<PublishCategory, DraftRecord[]>): void {
  for (const category of categories) {
    const slugs = new Set(recordsByCategory[category].map((record) => record.slug));
    for (const record of recordsByCategory[category]) {
      for (const relatedSlug of record.relatedSlugs) {
        if (!slugs.has(relatedSlug)) {
          throw new Error(
            `[publish-data] ${category}/${record.slug} references missing published slug "${relatedSlug}". Related records must be verified and present in the same draft dataset.`,
          );
        }
      }
    }
  }
}

function imageCategory(type: string): PublishCategory | undefined {
  if (type === "item") return "items";
  if (type === "coin") return "coins";
  if (type === "accessory") return "accessories";
  return undefined;
}

export function validateImages(
  rawImages: Record<string, unknown>[],
  recordsByCategory: Record<PublishCategory, DraftRecord[]>,
): ImageRecord[] {
  validateDataset("images", rawImages);
  const images = rawImages as ImageRecord[];
  const normalizedAlt = new Map<string, string>();
  const imageKeys = new Set<string>();
  const dataSlugs = Object.fromEntries(
    categories.map((category) => [category, new Set(recordsByCategory[category].map((record) => record.slug))]),
  ) as Record<PublishCategory, Set<string>>;

  for (const image of images) {
    const category = imageCategory(image.type.trim().toLowerCase());
    if (!category) {
      throw new Error(`[publish-data] images.json entry "${image.slug}" has unsupported type "${image.type}".`);
    }
    if (!dataSlugs[category].has(image.slug)) {
      throw new Error(
        `[publish-data] images.json slug "${image.slug}" does not match a verified ${category} record selected for publication.`,
      );
    }

    const altKey = image.alt.trim().toLocaleLowerCase("en");
    const firstSlug = normalizedAlt.get(altKey);
    if (firstSlug) {
      throw new Error(`[publish-data] Duplicate image alt text is used by "${firstSlug}" and "${image.slug}".`);
    }
    normalizedAlt.set(altKey, image.slug);
    imageKeys.add(`${category}:${image.slug}`);

    const expectedPath = `/images/wiki/${category}/${image.slug}.png`;
    const record = recordsByCategory[category].find((entry) => entry.slug === image.slug);
    if (record?.image !== expectedPath) {
      throw new Error(
        `[publish-data] ${category}/${image.slug} must declare image path "${expectedPath}" to match images.json.`,
      );
    }
    if (!existsSync(path.join(projectRoot, "public", expectedPath.slice(1)))) {
      throw new Error(`[publish-data] Missing local image file for ${category}/${image.slug}: ${expectedPath}`);
    }
  }

  for (const category of categories) {
    for (const record of recordsByCategory[category]) {
      if (typeof record.image === "string" && record.image.trim() && !imageKeys.has(`${category}:${record.slug}`)) {
        throw new Error(
          `[publish-data] ${category}/${record.slug} declares an image path but has no matching entry in images.json.`,
        );
      }
    }
  }

  return images;
}

export async function buildPublishPlan() {
  const draftRecords = {} as Record<PublishCategory, Record<string, unknown>[]>;
  for (const category of categories) {
    draftRecords[category] = await readJSONArray(path.join(draftDirectory, `${category}.draft.json`));
  }

  const publishable = {
    items: selectVerified("items", draftRecords.items),
    coins: selectVerified("coins", draftRecords.coins),
    accessories: selectVerified("accessories", draftRecords.accessories),
  } satisfies Record<PublishCategory, DraftRecord[]>;

  validateRelatedSlugs(publishable);
  const images = validateImages(await readJSONArray(path.join(wikiDirectory, "images.json")), publishable);

  return { draftRecords, publishable, images };
}

async function writePublishedData(recordsByCategory: Record<PublishCategory, DraftRecord[]>): Promise<void> {
  const temporaryFiles: { temporary: string; target: string }[] = [];
  for (const category of categories) {
    const target = path.join(wikiDirectory, `${category}.json`);
    const temporary = `${target}.publish-tmp`;
    await writeFile(temporary, `${JSON.stringify(recordsByCategory[category], null, 2)}\n`, "utf8");
    temporaryFiles.push({ temporary, target });
  }
  for (const file of temporaryFiles) await rename(file.temporary, file.target);
}

async function main(): Promise<void> {
  const argumentsSet = new Set(process.argv.slice(2));
  const publish = argumentsSet.has("--publish");
  const unknownArguments = [...argumentsSet].filter((argument) => argument !== "--publish" && argument !== "--dry-run");
  if (unknownArguments.length) {
    throw new Error(`[publish-data] Unknown argument(s): ${unknownArguments.join(", ")}`);
  }

  const plan = await buildPublishPlan();
  if (publish) await writePublishedData(plan.publishable);

  const summary = Object.fromEntries(categories.map((category) => [category, {
    draft: plan.draftRecords[category].length,
    verified: plan.publishable[category].length,
    excluded: plan.draftRecords[category].length - plan.publishable[category].length,
  }]));

  console.log(JSON.stringify({
    mode: publish ? "published" : "dry-run",
    datasets: summary,
    imagesValidated: plan.images.length,
  }, null, 2));

  if (!publish) {
    console.log("Validation passed. Run npm run publish:data -- --publish to replace the formal datasets.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
