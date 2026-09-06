# RE:Heads, Please! Wiki — Final Pre-Launch Audit

- Audit date: 2026-09-06
- Production origin: `https://reheadsplease.ymmyi.wiki`
- Audit target: production static output in `dist/`
- Build command: `npm run build`
- Build result: passed; 242 pages generated
- Pages added during this phase: 0
- AdSense status: disabled

## Executive verdict

**Status: READY FOR PRODUCTION LAUNCH.**

The previous release blockers have been resolved. The production origin is configured, canonical and social URLs are absolute, the sitemap contains all 242 pages, `robots.txt` references the production sitemap, every page has one BreadcrumbList schema, and all audited titles are between 30 and 60 decoded characters.

Two database entries still lack dedicated content images, but both use the existing fixed-ratio fallback and the default Open Graph image. They do not create broken images or layout shift and are not considered launch blockers.

## Page inventory

| Check | Result |
| --- | ---: |
| Generated HTML pages | 242 |
| Sitemap URLs | 242 |
| Unique sitemap URLs | 242 |
| Formal database records | 31 |
| Registered and bound content images | 29 |
| Video records / rendered embeds | 6 / 6 |
| Pages added by this repair | 0 |

## SEO checks

| Check | Result | Status |
| --- | ---: | --- |
| Title present | 242/242 | Pass |
| Title length within 30–60 decoded characters | 242/242 | Pass |
| Titles over 60 characters | 0 | Pass |
| Unique titles | 242/242 | Pass |
| Meta description present | 242/242 | Pass |
| Description length within 50–160 characters | 242/242 | Pass |
| Exactly one H1 | 242/242 | Pass |
| Canonical present, unique, and route-correct | 242/242 | Pass |
| Canonical uses the production origin | 242/242 | Pass |
| Open Graph core fields and absolute URLs | 242/242 | Pass |
| Twitter Card fields and absolute images | 242/242 | Pass |

The earlier report counted 30 long titles because it measured the encoded HTML string `&amp;` as five characters. The corrected decoded baseline contained 18 titles over 60 characters. All 18 have now been shortened without changing page intent; the final over-limit count is zero.

## robots.txt

- Source: `public/robots.txt`
- Built file: `dist/robots.txt`
- `User-agent: *`: present
- `Allow: /`: present
- Sitemap declaration: `https://reheadsplease.ymmyi.wiki/sitemap-index.xml`
- Result: **Pass**

## Sitemap

- `dist/sitemap-index.xml`: generated
- Child sitemap: `dist/sitemap-0.xml`
- URLs: 242
- Unique URLs: 242
- Absolute production URLs: 242/242
- Result: **Pass**

## Canonical and social metadata

- Canonical: 242/242 absolute, unique, and route-correct
- `og:url`: 242/242 absolute and route-correct
- `og:image`: 242/242 absolute
- `twitter:image`: 242/242 absolute
- Dedicated database images: 29 records
- Default OG fallback: used whenever a page has no dedicated image
- Result: **Pass**

## Schema checks

| Schema check | Result |
| --- | ---: |
| JSON-LD script blocks parsed | 578 |
| Invalid JSON-LD blocks | 0 |
| WebSite schema | 242/242 |
| BreadcrumbList schema | 242/242 |
| Pages with duplicate BreadcrumbList schema | 0 |
| Article schema | 56 |
| FAQPage schema | 94 |
| Non-absolute schema `url` fields | 0 |
| Non-absolute Article `mainEntityOfPage` values | 0 |
| Invalid breadcrumb item URLs | 0 |

Every generated page now receives exactly one BreadcrumbList from the shared layout. Article `url`, Article `mainEntityOfPage.@id`, WebSite `url`, schema identifiers, and breadcrumb item URLs use the confirmed production origin.

## External-link and AdSense checks

| Check | Result |
| --- | ---: |
| Navigable external `<a>` links | 0 |
| Approved YouTube privacy-enhanced embeds | 6 |
| Unapproved external resources | 0 |
| Rendered AdSense scripts or slots | 0 |

AdSense remains disabled. The only external runtime resources are the six previously approved `youtube-nocookie.com` iframe embeds.

## Video checks

- Registered video entries: 6
- Rendered embeds: 6
- Expected target coverage: Home, Codes, Beginner Guide, Coins, Accessories, Skateboard
- Privacy-enhanced YouTube domain: 6/6
- Lazy loading and iframe titles: 6/6
- Result: **Pass**

## RE:Heads, Please! relevance audit

| Measurement | Before | After |
| --- | ---: | ---: |
| Exact game name in title or description | 242/242 | 242/242 |
| Exact game name in both title and description | 212/242 (87.6%) | 242/242 (100%) |

The 30 strict failures were database-detail descriptions that omitted the exact game name. Their metadata now identifies the verified RE:Heads, Please! database while preserving the original entry intent. No unrelated game page or off-topic route was detected.

## Image audit

- Formal database records: 31
- Registered and bound local images: 29
- Bound paths with missing files: 0
- Duplicate alt text: 0
- Dedicated image coverage: 29/31 (93.5%)
- Missing dedicated content images:
  - `/coins/lock-coin/` — expected `/images/wiki/coins/lock-coin.png`
  - `/coins/calendar-coin/` — expected `/images/wiki/coins/calendar-coin.png`

Both routes use the shared fixed-ratio content fallback. Their social metadata uses the default local OG image, so every page has a valid absolute social image URL.

## Final decision

The audited build meets the requested technical launch standard: crawl directives, complete sitemap, absolute canonical and social URLs, valid JSON-LD, full breadcrumb coverage, compliant title lengths, strict game relevance, and disabled AdSense all pass. The two pending dedicated content images are a non-blocking asset-completeness item.
