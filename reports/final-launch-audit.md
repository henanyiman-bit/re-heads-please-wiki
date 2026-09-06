# Phase22 Final Pre-Launch Full Audit

Audit date: 2026-09-07  
Production origin: `https://reheadsplease.ymmyi.wiki`  
Audit target: Astro static production output in `dist/`

## Executive verdict

**READY: YES**

The production build, 242-route HTTP crawl, metadata inspection, JSON-LD parsing, internal-link graph, image pipeline, video embeds, and representative responsive layouts all pass their launch-blocking checks. No URL, content, SEO metadata, Schema, JSON data, Markdown, image, or UI source was changed during this audit.

There are no launch blockers. Twenty-four pairs of rendered pages remain at or above 80% five-word-shingle similarity. They are not exact duplicates and do not share exact primary keywords, Titles, H1s, or meta descriptions; they remain a post-launch editorial observation rather than a deployment blocker.

## 1. Page and route integrity

| Check | Result |
|---|---:|
| Astro pages built | 242 |
| Unique generated routes | 242 |
| Production-preview HTTP 200 responses | 242/242 |
| Non-200 / detected 404 responses | 0 |
| Empty pages | 0 |
| Exact duplicate rendered bodies | 0 |
| Pages with exactly one H1 | 242/242 |

Result: **PASS**.

## 2. Content quality

Rendered word counts use visible `<main>` text while excluding scripts, styles, and navigation.

| Word band | Pages |
|---|---:|
| Below 300 words | 0 |
| 300–799 words | 41 |
| 800+ words | 201 |

Additional structure totals:

- H2 elements: **2,336**
- H3 elements: **993**
- Rendered image elements: **62**
- Tables: **104**
- Pages with an FAQ section: **237**
- Lorem ipsum, TODO, TBD, or placeholder-text filler flags: **0**
- Exact duplicate body groups: **0**
- Five-word-shingle similarity pairs at or above 80%: **24**

Thin Content: **0**. No empty or exact-copy page was found. The 24 high-similarity pairs are concentrated in closely related database/reference templates, including numbered Spray and Boardmarker entities and adjacent database indexes. They should be monitored editorially, but their entity or search intents remain distinct.

## 3. Keyword and search-intent mapping

All 242 URLs have a primary keyword and one dominant search intent:

| Route group | Pages | Primary-keyword source | Search intent |
|---|---:|---|---|
| Homepage | 1 | `keywords.json` L1 | Navigational |
| Core L2 Hubs | 7 | `keywords.json` L2 | Navigational |
| Generated L3 pages | 196 | `keywords.json` L3 | Informational |
| Items, Coins, Accessories entities | 31 | Verified database keyword field | Entity lookup |
| FAQ and Updates | 2 | Page metadata | Informational |
| Wiki | 1 | Page metadata | Navigational |
| Live database category pages | 3 | Page metadata | Database lookup |
| Game Mechanics static guide | 1 | Page metadata | Informational |

The four pages that are intentionally outside the generic keyword-route records map as follows:

| URL | Primary Keyword | Search Intent |
|---|---|---|
| `/database/items` | RE:Heads, Please! Items Database | Database lookup |
| `/database/coins` | RE:Heads, Please! Coins Database | Database lookup |
| `/database/accessories` | RE:Heads, Please! Accessories Database | Database lookup |
| `/guides/game-mechanics` | RE:Heads, Please! Game Mechanics | Informational |

- URLs mapped: **242/242**
- Exact duplicate primary-keyword groups: **0**
- Exact duplicate Title groups: **0**
- Exact duplicate H1 groups: **0**
- Wrong or missing intent mappings: **0**

The complete row-level URL/keyword/intent inventory is retained in [`keyword-map-v2.csv`](./keyword-map-v2.csv). Ten semantically adjacent topic groups remain intentionally separated by intent—for example Hub navigation versus live database lookup, singular entity versus plural collection reference, and entity record versus usage guide.

Result: **PASS — one primary search intent per page**.

## 4. SEO metadata

| Check | Result |
|---|---:|
| Exactly one Title | 242/242 |
| Exactly one meta Description | 242/242 |
| Exactly one absolute self-canonical | 242/242 |
| Complete Open Graph field set | 242/242 |
| Complete Twitter Card field set | 242/242 |
| Duplicate Titles | 0 groups |
| Duplicate Descriptions | 0 groups |
| Duplicate or mismatched canonicals | 0 |

The Open Graph check includes `og:title`, `og:description`, `og:type`, `og:url`, and `og:image`. The Twitter check includes card, title, description, and image.

Result: **PASS**.

## 5. JSON-LD Schema

| Schema check | Result |
|---|---:|
| JSON-LD blocks | 578 |
| JSON parse errors | 0 |
| Duplicate blocks on the same page | 0 |
| Breadcrumb pages | 242/242 |
| WebSite objects | 242 |
| Article objects | 56 |
| WebPage objects | 56 |
| FAQPage objects | 94 |

Other expected nested objects include `ListItem`, `Organization`, `Question`, and `Answer`. No unexpected Schema type or malformed JSON-LD block was detected.

Result: **PASS**.

## 6. Sitemap and robots

- `public/robots.txt`: present
- `User-agent: *`: present
- `Allow: /`: present
- Production Sitemap declaration: present
- `dist/sitemap-index.xml`: present
- `dist/sitemap-0.xml`: present
- Sitemap URLs: **242**
- Duplicate Sitemap URLs: **0**
- Build routes missing from Sitemap: **0**
- Sitemap routes missing from build: **0**
- Sitemap/canonical route mismatches after trailing-slash normalization: **0**

Result: **PASS**.

## 7. Internal links and crawl depth

| Check | Result |
|---|---:|
| Internal link references | 5,332 |
| Broken internal links | 0 |
| Orphan pages | 0 |
| Pages unreachable from Homepage | 0 |
| Maximum click depth from Homepage | 3 |

Click-depth distribution: depth 0: **1**, depth 1: **26**, depth 2: **208**, depth 3: **7**.

Result: **PASS**.

## 8. Image integrity and SEO

The 31 verified database images were checked against `items.json`, `coins.json`, `accessories.json`, `images.json`, public assets, and rendered detail pages.

| Check | Result |
|---|---:|
| Verified images | 31/31 |
| PNG fallback exists | 31/31 |
| WebP source exists | 31/31 |
| AVIF source exists | 31/31 |
| Unique non-empty alt text | 31/31 |
| Explicit width and height | 31/31 |
| Loading attribute | 31/31 |
| AVIF → WebP → PNG picture chain | 31/31 |
| External `<img>` sources | 0 |

Result: **PASS**.

## 9. Video embeds

- Configured video records: **6**
- Rendered iframe placements: **6/6**
- Unique YouTube IDs: **5**; Homepage and Codes intentionally reuse one configured video
- Privacy-enhanced `youtube-nocookie.com`: **6/6**
- `loading="lazy"`: **6/6**
- Non-empty iframe title: **6/6**
- Sandbox restrictions: **6/6**
- YouTube external anchor links: **0**

Result: **PASS**.

## 10. Mobile rendering

Live browser checks covered Homepage, Codes Hub, Database Hub, Enchant Book detail, and Beginner Guide at 375, 390, 412, and 768 px: **20 route/viewport checks**.

| Viewport | Page-level overflow | Header | Search | Cards | Tables | Images |
|---:|---:|---|---|---|---|---|
| 375 px | 0 px | PASS | PASS | PASS | PASS | PASS |
| 390 px | 0 px | PASS | PASS | PASS | PASS | PASS |
| 412 px | 0 px | PASS | PASS | PASS | PASS | PASS |
| 768 px | 0 px | PASS | PASS | PASS | PASS | PASS |

Tables that require width remain contained by their own scroll container. No tested card or image crossed the viewport boundary.

Result: **PASS**.

## 11. Cloudflare Pages compatibility

- Build command: `npm run build`
- Output directory: `dist`
- Astro output: static
- Build result: successful
- Generated pages: 242
- `dist/index.html`, Sitemap index, and child Sitemap: present
- Required Node version: `>=22.12.0`
- Audit runtime: Node `v24.20.0`, npm `11.19.0`
- Production site origin is configured directly in `astro.config.mjs`
- Missing required build environment variables: **0**

The `PUBLIC_ADSENSE_*` variables in `.env.example` are optional while AdSense remains disabled. For Cloudflare Pages, use Node 22.12 or newer, `npm run build`, and `dist` as the output folder.

Result: **PASS**.

## Blocking issues

**None.**

## Non-blocking recommendations

1. Monitor the 24 high-similarity page pairs after indexing. Prioritize entity families and adjacent database index pages if Search Console later shows cannibalization or weak engagement.
2. Keep the ten semantically adjacent keyword groups separated by their current intent boundaries when editing future copy.
3. Configure Cloudflare Pages to use Node 22.12 or newer so the deployment environment matches `package.json`.
4. The six video placements currently use five unique source IDs. This is technically valid, but may be diversified later if a separately verified and relevant video becomes available.

## Final launch decision

**READY: YES**

The project meets the requested pre-launch thresholds: 242 pages, zero detected 404 responses, zero thin pages, complete SEO metadata, 578 valid Schema blocks, a 242-URL Sitemap, zero broken or orphaned pages, maximum click depth 3, 31/31 image pipelines, 6/6 secure video embeds, and zero horizontal overflow in the tested responsive matrix.
