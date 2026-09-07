import keywordData from "../content/wiki/keywords.json";

export interface KeywordL1 {
  keyword: string;
  url: string;
  title: string;
  description: string;
  h1: string;
}

export interface KeywordPage {
  slug: string;
  keyword: string;
  variants: string[];
  intent: string;
  title: string;
  description: string;
  h1: string;
  outline: string[];
  faq: string[];
  priority: number;
}

export interface KeywordCategory {
  slug: string;
  keyword: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  l3: KeywordPage[];
}

export interface KeywordMatrix {
  l1: KeywordL1;
  l2: KeywordCategory[];
}

export interface KeywordInternalLink {
  href: string;
  label: string;
}

const matrix = keywordData as KeywordMatrix;

export function getKeywordMatrix(): KeywordMatrix {
  return matrix;
}

export function getKeywordCategories(): KeywordCategory[] {
  return matrix.l2;
}

export function getKeywordCategory(categorySlug: string): KeywordCategory | undefined {
  return matrix.l2.find((category) => category.slug === categorySlug);
}

export function getKeywordPage(categorySlug: string, pageSlug: string): KeywordPage | undefined {
  return getKeywordCategory(categorySlug)?.l3.find((page) => page.slug === pageSlug);
}

export function getKeywordInternalLinks(
  category: KeywordCategory,
  currentPage: KeywordPage,
  limit = 4,
): KeywordInternalLink[] {
  const currentIndex = category.l3.findIndex((page) => page.slug === currentPage.slug);
  const stopWords = new Set(["re", "heads", "please", "wiki", "guide", "guides", "game", category.slug.replace("-", " ")]);
  const tokensFor = (page: KeywordPage) => new Set(
    `${page.slug} ${page.keyword} ${page.variants.join(" ")}`
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.filter((token) => token.length > 2 && !stopWords.has(token)) ?? [],
  );
  const currentTokens = tokensFor(currentPage);
  const candidates = category.l3
    .map((page, index) => {
      if (page.slug === currentPage.slug) return undefined;
      const sharedTokens = [...tokensFor(page)].filter((token) => currentTokens.has(token)).length;
      const forwardDistance = (index - currentIndex + category.l3.length) % category.l3.length;
      return { page, sharedTokens, forwardDistance };
    })
    .filter((candidate): candidate is { page: KeywordPage; sharedTokens: number; forwardDistance: number } => Boolean(candidate))
    .sort((a, b) => b.sharedTokens - a.sharedTokens || a.forwardDistance - b.forwardDistance)
    .slice(0, limit)
    .map(({ page }) => page);

  return candidates.map((page) => ({
    href: `/${category.slug}/${page.slug}`,
    label: page.h1,
  }));
}

const crossCategoryMap: Record<string, string[]> = {
  codes: ["items", "database", "guides"],
  items: ["database", "accessories", "tier-list"],
  coins: ["database", "guides", "tier-list"],
  accessories: ["database", "items", "guides"],
  guides: ["database", "codes", "tier-list"],
  "tier-list": ["database", "items", "coins"],
  database: ["items", "coins", "accessories"],
};

export function getCrossCategoryHubLinks(categorySlug: string, limit = 2): KeywordInternalLink[] {
  return (crossCategoryMap[categorySlug] ?? [])
    .map((slug) => getKeywordCategory(slug))
    .filter((category): category is KeywordCategory => Boolean(category))
    .slice(0, limit)
    .map((category) => ({ href: `/${category.slug}`, label: category.navLabel }));
}

export function getKeywordLinkLabel(href: string): string {
  const [categorySlug, pageSlug] = href.split("/").filter(Boolean);
  const category = getKeywordCategory(categorySlug);
  if (category && !pageSlug) return category.navLabel;
  const page = category?.l3.find((candidate) => candidate.slug === pageSlug);
  if (page) return page.h1.replace("RE:Heads, Please! ", "");
  return (pageSlug ?? categorySlug ?? "Wiki")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getKeywordPagePaths(excludedCategories: string[] = []) {
  const excluded = new Set(excludedCategories);
  return matrix.l2
    .filter((category) => !excluded.has(category.slug))
    .flatMap((category) =>
      category.l3.map((page) => ({
        params: { category: category.slug, slug: page.slug },
        props: { category, page },
      })),
    );
}

export function getCategoryKeywordPaths(categorySlug: string) {
  const category = getKeywordCategory(categorySlug);
  if (!category) return [];

  return category.l3.map((page) => ({
    params: { slug: page.slug },
    props: { keywordCategory: category, keywordPage: page },
  }));
}
