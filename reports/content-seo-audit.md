# RE:Heads, Please! Wiki - Content SEO Audit

Audit date: 2026-09-06

## Executive Result

- Public pages: **242**
- URL-to-primary-keyword mapping: **242 / 242**
- Exact duplicate primary keywords: **0**
- Strict one-keyword-one-page result: **FAIL / needs review**
- Semantically adjacent keyword groups: **10**
- Pages with at least 300 rendered words: **27.3%**
- Thin-content pages below 300 words: **176**
- Exact duplicate Title / H1 / Description groups: **0 / 0 / 0**
- Body similarity pairs at or above 80%: **177**
- Build: **PASS - 242 pages**

The exact keyword database is unique, but strict SEO intent isolation is not yet complete because several Hub, database index, entity, plural-topic, and guide routes remain semantically adjacent. The primary release risk is incomplete textual coverage, not missing metadata or broken routing.

## Keyword Architecture

### Hub pages

The seven L2 routes are identifiable as navigational category hubs: `/codes`, `/items`, `/coins`, `/accessories`, `/database`, `/guides`, and `/tier-list`. Their rendered content is above 800 words, and their exact primary keywords do not duplicate a child route.

### Entity detail pages

The 31 verified item, coin, and accessory records each have one unique canonical entity route. No duplicate entity slug route was found. Entity-vs-topic adjacency still needs editorial separation for Enchant Book, Engraving Scroll, Accessory Ticket, and Skateboard.

### Multi-intent concentration

No URL was confirmed to contain two unrelated primary search intents. Six routes contain cross-category terms, but each still expresses one composite intent (for example, codes that reward items or a coin ranking). Homepage and Hub breadth is intentional and was not treated as an error.

### Semantic collision groups

- **accessories:** /accessories, /database/accessories
- **accessory ticket:** /accessories/accessory-tickets-guide, /items/accessory-ticket, /items/accessory-tickets
- **code reward:** /codes/code-rewards, /database/code-rewards
- **coin:** /coins, /database/coin-database, /database/coins
- **coin comparison:** /coins/coin-comparison, /database/coin-comparison
- **faq:** /database/database-faq, /faq
- **item:** /database/item-database, /database/items, /items
- **skateboard:** /guides/skateboard-guide, /items/skateboard
- **enchant book:** /items/enchant-book, /items/enchant-books
- **engraving scroll:** /items/engraving-scroll, /items/engraving-scrolls

## Text Coverage

- Green (>800 words): **63**
- Yellow (300-800 words): **3**
- Red (<300 words): **176**
- MDX-backed routes: **63 / 242**
- Pages with exactly one H1: **242 / 242**
- Pages with at least one H2: **242 / 242**

All seven Hub pages and 56 L3 articles are green. The yellow pages are `/`, `/database/coins`, and `/database/items`. The red set consists primarily of 140 unfilled L3 skeleton pages, all 31 verified entity detail pages, one database category page, and four static/utility pages.

## Empty and Thin Page Findings

- Only-title / minimal-body risk: **2** (`/updates`, `/wiki`)
- Only-image risk: **0**
- Only-table risk: **0**
- Link-list-dominant diagnostic flags: **150**

The link-list diagnostic reflects short pages with substantial navigation, FAQ, or related-link boilerplate. It is not a claim that all 150 pages contain literally no explanatory text.

## Duplicate Content Findings

- Title duplicates: **0 groups**
- H1 duplicates: **0 groups**
- Meta Description duplicates: **0 groups**
- Exact primary-keyword duplicates: **0 groups**
- Near-duplicate rendered-body pairs (>=80% five-word-shingle Jaccard): **177**

Most high-similarity pairs occur among non-MDX skeleton pages that share the same generated outline, FAQ, and related-link pattern. These need original page-specific bodies before they can be considered fully differentiated. See `duplicate-content-report.md` for every pair.

## Diagnostic SEO Structure Score

**59 / 100**

This is an internal diagnostic score, not a search-engine metric. Strong URL mapping, metadata uniqueness, headings, and build integrity are offset by 27.3% textual coverage, ten semantic-overlap groups, and 177 near-duplicate body pairs.

## Pages Requiring Optimization

The complete page-level measurements and flags are in `content-audit-report.md`. Thin routes are grouped below for planning:

### accessories (26)

- /accessories/accessories-faq - 134 words
- /accessories/accessory-effects - 134 words
- /accessories/accessory-inventory - 133 words
- /accessories/accessory-roll-system - 140 words
- /accessories/accessory-selection-guide - 140 words
- /accessories/accessory-stats - 134 words
- /accessories/accessory-updates - 134 words
- /accessories/accessory-value-comparison - 139 words
- /accessories/beginner-accessories - 138 words
- /accessories/best-accessories - 133 words
- /accessories/black-rose - 200 words
- /accessories/common-accessories - 136 words
- /accessories/cosmetic-accessories - 134 words
- /accessories/deep-web - 200 words
- /accessories/duplicate-accessories - 134 words
- /accessories/event-accessories - 139 words
- /accessories/hacker - 192 words
- /accessories/how-to-equip-accessories - 143 words
- /accessories/how-to-farm-accessory-tickets - 154 words
- /accessories/how-to-spend-accessory-tickets - 151 words
- /accessories/limited-accessories - 140 words
- /accessories/new-accessories - 141 words
- /accessories/rare-accessories - 133 words
- /accessories/seraphim - 191 words
- /accessories/sleepingbeauty - 191 words
- /accessories/void - 191 words

### codes (20)

- /codes/accessory-ticket-codes - 140 words
- /codes/already-redeemed-code - 135 words
- /codes/beginner-code-rewards - 136 words
- /codes/boost-item-codes - 137 words
- /codes/case-sensitive-codes - 134 words
- /codes/code-expiration - 128 words
- /codes/code-history - 127 words
- /codes/code-release-guide - 133 words
- /codes/code-rewards - 125 words
- /codes/code-status - 128 words
- /codes/code-troubleshooting - 130 words
- /codes/code-verification - 126 words
- /codes/codes-after-update - 137 words
- /codes/codes-faq - 125 words
- /codes/codes-with-free-items - 135 words
- /codes/enchant-book-codes - 138 words
- /codes/event-codes - 132 words
- /codes/invalid-code-error - 136 words
- /codes/update-codes - 130 words
- /codes/xbox-code-redemption - 135 words

### coins (30)

- /coins/calendar-coin - 181 words
- /coins/clover-coin - 196 words
- /coins/coin-enchantments - 132 words
- /coins/coin-farming - 132 words
- /coins/coin-inventory - 132 words
- /coins/coin-luck - 135 words
- /coins/coin-price - 135 words
- /coins/coin-profit - 133 words
- /coins/coin-updates - 131 words
- /coins/coins-faq - 130 words
- /coins/dalgona-coin - 187 words
- /coins/early-game-coins - 136 words
- /coins/event-coins - 130 words
- /coins/friendship-coin - 197 words
- /coins/graph-coin - 186 words
- /coins/how-to-enchant-coins - 141 words
- /coins/how-to-equip-coins - 143 words
- /coins/how-to-switch-coins - 141 words
- /coins/late-game-coins - 134 words
- /coins/limited-coins - 130 words
- /coins/lock-coin - 181 words
- /coins/mid-game-coins - 135 words
- /coins/new-coins - 131 words
- /coins/plush-toy-coin - 194 words
- /coins/rare-coins - 129 words
- /coins/rhythm-coin - 179 words
- /coins/secret-coins - 129 words
- /coins/slime-coin - 187 words
- /coins/starter-coin-guide - 138 words
- /coins/zone-coin - 180 words

### database (21)

- /database/accessories - 251 words
- /database/accessory-comparison - 140 words
- /database/beginner-lookup - 140 words
- /database/code-rewards - 141 words
- /database/coin-comparison - 140 words
- /database/data-accuracy - 136 words
- /database/database-changelog - 131 words
- /database/database-faq - 132 words
- /database/event-content - 140 words
- /database/farming-lookup - 140 words
- /database/glossary - 134 words
- /database/item-comparison - 140 words
- /database/limited-content - 140 words
- /database/mechanics-index - 139 words
- /database/new-entries - 139 words
- /database/recently-updated - 142 words
- /database/rewards-index - 135 words
- /database/source-index - 140 words
- /database/tier-index - 140 words
- /database/update-history - 138 words
- /database/verification-log - 140 words

### faq (1)

- /faq - 78 words

### guides (21)

- /guides/accessory-rolling-guide - 136 words
- /guides/another-station - 135 words
- /guides/beginner-mistakes - 131 words
- /guides/boosts-guide - 131 words
- /guides/enchantment-guide - 130 words
- /guides/event-preparation - 136 words
- /guides/farming-guide - 141 words
- /guides/fountain-guide - 132 words
- /guides/game-mechanics - 119 words
- /guides/how-to-get-accessories - 141 words
- /guides/how-to-roll-better-coins - 147 words
- /guides/inventory-guide - 129 words
- /guides/map-exploration - 136 words
- /guides/progression-guide - 94 words
- /guides/scroll-guide - 132 words
- /guides/skateboard-controls - 132 words
- /guides/skateboard-guide - 132 words
- /guides/station-travel - 134 words
- /guides/ticket-guide - 131 words
- /guides/tips-and-tricks - 84 words
- /guides/update-preparation - 137 words

### items (35)

- /items/accessory-ticket - 200 words
- /items/accessory-tickets - 136 words
- /items/best-beginner-items - 140 words
- /items/boardmarker-1 - 173 words
- /items/boardmarker-2 - 173 words
- /items/boardmarker-3 - 173 words
- /items/boardmarker-4 - 173 words
- /items/boardmarker-5 - 173 words
- /items/code-reward-items - 140 words
- /items/enchant-book - 198 words
- /items/energy-boost-items - 139 words
- /items/engraving-scroll - 198 words
- /items/engraving-scrolls - 136 words
- /items/event-items - 135 words
- /items/how-to-use-items - 143 words
- /items/item-drops - 134 words
- /items/item-farming - 134 words
- /items/item-locations - 136 words
- /items/item-progression-guide - 140 words
- /items/item-rewards - 135 words
- /items/item-tiers-explained - 141 words
- /items/item-uses - 136 words
- /items/items-faq - 136 words
- /items/limited-items - 134 words
- /items/luck-boost-items - 140 words
- /items/money-boost-items - 140 words
- /items/new-items - 134 words
- /items/rare-items - 135 words
- /items/skateboard - 200 words
- /items/spray-1 - 178 words
- /items/spray-2 - 178 words
- /items/spray-3 - 178 words
- /items/spray-4 - 178 words
- /items/spray-5 - 178 words
- /items/vip-skateboard - 190 words

### tier-list (20)

- /tier-list/a-tier-coins - 140 words
- /tier-list/accessory-roll-priority - 139 words
- /tier-list/accessory-value-tier-list - 144 words
- /tier-list/b-tier-coins - 141 words
- /tier-list/boost-tier-list - 140 words
- /tier-list/c-tier-coins - 142 words
- /tier-list/coin-roll-priority - 139 words
- /tier-list/consumable-tier-list - 141 words
- /tier-list/cosmetic-accessory-tier-list - 144 words
- /tier-list/early-game-tier-list - 145 words
- /tier-list/enchant-book-tier-list - 144 words
- /tier-list/event-item-tier-list - 144 words
- /tier-list/how-tier-rankings-work - 142 words
- /tier-list/late-game-tier-list - 143 words
- /tier-list/mid-game-tier-list - 144 words
- /tier-list/s-tier-coins - 139 words
- /tier-list/ticket-value-tier-list - 145 words
- /tier-list/tier-list-methodology - 138 words
- /tier-list/tier-list-update-changes - 150 words
- /tier-list/upgrade-priority-tier-list - 144 words

### updates (1)

- /updates - 39 words

### wiki (1)

- /wiki - 49 words

## Recommended Audit Order

1. Differentiate the 10 semantically adjacent keyword groups and assign one precise intent to each route.
2. Fill the 140 L3 route skeletons with page-specific prose before treating them as complete SEO pages.
3. Expand the 31 verified entity pages while retaining one-entity-one-route architecture.
4. Expand `/updates`, `/wiki`, `/faq`, and other static thin pages.
5. Re-run body-similarity analysis after content expansion; do not solve similarity by changing only titles or headings.

## Generated Files

- `keyword-page-map.csv` - all 242 URL/keyword mappings
- `content-audit-report.md` - per-page word and element counts
- `duplicate-content-report.md` - exact and near-duplicate findings
- `content-seo-audit.md` - executive audit and optimization list

No source, route, Markdown, JSON, SEO, or UI file was modified by this audit. No Git add, commit, push, or synchronization command was executed.
