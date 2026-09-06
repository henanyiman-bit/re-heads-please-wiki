import items from "../content/wiki/items.json";
import coins from "../content/wiki/coins.json";
import accessories from "../content/wiki/accessories.json";
import categories from "../content/wiki/categories.json";
import images from "../content/wiki/images.json";
import videos from "../content/wiki/videos.json";

export type WikiDatasetName = "items" | "coins" | "accessories" | "categories" | "images" | "videos";

const datasetRegistry: Record<WikiDatasetName, unknown> = {
  items,
  coins,
  accessories,
  categories,
  images,
  videos,
};

export function importWikiDataset<T extends Record<string, unknown>>(name: WikiDatasetName): T[] {
  const dataset = datasetRegistry[name];
  if (!Array.isArray(dataset)) {
    throw new Error(`[wiki-data] ${name}.json must contain a JSON array.`);
  }
  return dataset as T[];
}

export function getAvailableDatasets(): WikiDatasetName[] {
  return Object.keys(datasetRegistry) as WikiDatasetName[];
}
