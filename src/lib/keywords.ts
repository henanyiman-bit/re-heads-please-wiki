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
  const candidates = [
    ...category.l3.slice(currentIndex + 1),
    ...category.l3.slice(0, currentIndex),
  ];

  return candidates.slice(0, limit).map((page) => ({
    href: `/${category.slug}/${page.slug}`,
    label: page.h1,
  }));
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
