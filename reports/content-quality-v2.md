# Content Quality Audit V2

Audit date: 2026-09-06

## Summary

- Total pages: **242**
- Pages with 300+ rendered words: **235**
- 300+ coverage: **97.1%**
- Pages with more than 800 rendered words: **64**
- 800+ coverage: **26.4%**
- MDX pages: **63**
- Thin pages below 300 words: **7**
- Previous thin-page count: **176**
- Thin pages removed from risk class: **169**

Rendered word counts use the generated page main content and exclude the shared site header and footer. The 800-word Codes requirement was also checked against the MDX body for the five MDX targets and against rendered article content for the non-MDX Code Rewards route.

## Coverage by Page Type

| Page type | Pages | 300+ | 800+ | Thin | Average words |
|---|---:|---:|---:|---:|---:|
| Accessory Detail | 6 | 6 | 0 | 0 | 401 |
| Coin Detail | 10 | 10 | 0 | 0 | 378 |
| Database Category | 3 | 3 | 0 | 0 | 518 |
| Homepage | 1 | 1 | 0 | 0 | 530 |
| Item Detail | 15 | 15 | 0 | 0 | 385 |
| L2 Hub | 7 | 7 | 7 | 0 | 1,406 |
| L3 Article | 196 | 193 | 57 | 3 | 760 |
| Static Page | 1 | 0 | 0 | 1 | 119 |
| Utility Page | 3 | 0 | 0 | 3 | 55 |

## Priority Codes

| Route | Article words | Result |
|---|---:|---|
| `/codes/working-codes` | 1,179 MDX words | PASS |
| `/codes/new-codes` | 1,179 MDX words | PASS |
| `/codes/expired-codes` | 1,184 MDX words | PASS |
| `/codes/how-to-redeem-codes` | 1,175 MDX words | PASS |
| `/codes/codes-not-working` | 1,181 MDX words | PASS |
| `/codes/code-rewards` | 850 rendered article words | PASS |

`/codes/redeem-codes` was not created because it would change the route count and compete with the existing `/codes/how-to-redeem-codes` URL.

## Priority Database

The requested `/database/rarity` and `/database/locations` intents were handled through the existing canonical routes `/database/rarity-index` and `/database/location-index`. No duplicate route was added.

All six target intents now include database interpretation, table or field guidance, search-intent separation, verification limits, and related-page navigation. The three live category tables remain driven by the verified JSON records and no missing value was invented.

## Items, Coins, and Accessories

- All 15 Item entities now use Item Overview, Appearance, How To Obtain, Usage, Information Table, Related Items, and FAQ sections.
- All 10 Coin entities now use Coin Overview, Collection Information, How To Obtain, Comparison, Information Table, Related Coins, and FAQ sections.
- All 6 Accessory entities now use Accessory Overview, Rarity, How To Unlock, Gacha Information, Information Table, Related Accessories, and FAQ sections.
- Missing L3 MDX routes now render category-specific reference prose instead of an empty skeleton.
- Existing long-form MDX headings were separated into Item, Coin, Accessory, Guide, Database, and Codes structures.

## Homepage Check

The Homepage title remains `RE:Heads, Please! Wiki - Codes, Guides, Tier List & Database`. The existing Game Introduction states that the title is a Roblox collection and progression experience, describes resources and collection activity, lists Wiki coverage, and directs readers into the database and guides. No Homepage SEO field was changed in Phase 16.

## Technical Integrity

- Pages: **242**
- Sitemap URLs: **242**
- Canonical URLs: **242 / 242**
- Breadcrumb Schema: **242 / 242**
- JSON-LD parse errors: **0**
- Broken internal links: **0**
- Missing generated routes / detected 404 targets: **0**
- Exact Title, H1, and Description duplicate groups: **0**
- AdSense state: unchanged
