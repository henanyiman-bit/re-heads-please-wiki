import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wikiArticles = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/wiki",
    generateId: ({ entry }) => entry.replace(/\\/g, "/").replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string().min(1),
    h1: z.string().min(1),
    description: z.string().min(1),
    keyword: z.string().min(1),
    keywords: z.array(z.string().min(1)),
    slug: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string().min(1)),
    cover: z.string(),
    coverAlt: z.string().min(1),
    publishedAt: z.string().min(1),
    updatedAt: z.string().min(1),
    infobox: z.record(z.string(), z.string()),
    faq: z.array(z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })).min(3).max(5),
    related: z.array(z.string().startsWith("/")),
  }),
});

export const collections = { wikiArticles };
