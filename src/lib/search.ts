import { getAccessories, getCoins, getItems, type WikiCategory, type WikiEntry } from "./data";
import { getKeywordMatrix } from "./keywords";

export interface SearchEntry {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string[];
}

const standalonePages: SearchEntry[] = [
  { title: "Updates", href: "/updates", category: "Page", description: "RE:Heads, Please! update notes and wiki changes.", keywords: ["updates", "changes"] },
  { title: "FAQ", href: "/faq", category: "Page", description: "Frequently asked questions about RE:Heads, Please!", keywords: ["faq", "questions", "help"] },
  { title: "Wiki Index", href: "/wiki", category: "Page", description: "Browse the complete RE:Heads, Please! wiki index.", keywords: ["wiki", "index", "pages"] },
  { title: "Items Database", href: "/database/items", category: "Database", description: "Search verified item values, rarity and locations.", keywords: ["items", "database", "values"] },
  { title: "Coins Database", href: "/database/coins", category: "Database", description: "Search verified coin values, rarity and sources.", keywords: ["coins", "database", "values"] },
  { title: "Accessories Database", href: "/database/accessories", category: "Database", description: "Search verified accessory values, rarity and tiers.", keywords: ["accessories", "database", "values"] },
  { title: "Value List", href: "/database/value-list", category: "Database", description: "Compare documented RE:Heads, Please! values.", keywords: ["value list", "items", "coins", "accessories"] },
  { title: "Game Mechanics", href: "/guides/game-mechanics", category: "Guides", description: "Understand the core systems used in RE:Heads, Please!", keywords: ["game mechanics", "systems", "guide"] },
];

const categoryLabel = (slug: string) => slug
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(" ");

function databaseSearchEntry(category: WikiCategory, entry: WikiEntry): SearchEntry {
  return {
    title: entry.name,
    href: `/${category}/${entry.slug}`,
    category: categoryLabel(category),
    description: entry.description,
    keywords: [entry.name, entry.rarity, entry.value, ...entry.keywords].filter(Boolean),
  };
}

export function getSearchIndex(): SearchEntry[] {
  const matrix = getKeywordMatrix();
  const entries: SearchEntry[] = [
    {
      title: matrix.l1.h1,
      href: matrix.l1.url,
      category: "Page",
      description: matrix.l1.description,
      keywords: [matrix.l1.keyword, "home"],
    },
    ...matrix.l2.flatMap((category) => [
      {
        title: category.h1,
        href: `/${category.slug}`,
        category: category.navLabel,
        description: category.description,
        keywords: [category.keyword, category.navLabel],
      },
      ...category.l3.map((page) => ({
        title: page.h1,
        href: `/${category.slug}/${page.slug}`,
        category: category.navLabel,
        description: page.description,
        keywords: [page.keyword, ...page.variants],
      })),
    ]),
    ...getItems().map((entry) => databaseSearchEntry("items", entry)),
    ...getCoins().map((entry) => databaseSearchEntry("coins", entry)),
    ...getAccessories().map((entry) => databaseSearchEntry("accessories", entry)),
    ...standalonePages,
  ];

  return [...new Map(entries.map((entry) => [entry.href, entry])).values()];
}
