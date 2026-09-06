# Content Coverage Audit

Audit date: 2026-09-06

## Method

HTML word counts use visible English words from each generated page main content region. Markdown counts use the matching MDX body when one exists. Shared header and footer text are excluded. Grades follow the requested thresholds: Green >800, Yellow 300-800, Red <300.

## Summary

- Public pages: 242
- Green: 63
- Yellow: 3
- Red / thin-content risk: 176
- Pages with at least 300 rendered words: 27.3%
- Pages backed by MDX: 63 / 242
- Exactly one H1: 242 / 242
- Pages with at least one H2: 242 / 242

## Empty and Dominant-Format Risks

- Title-only or minimal-body risk: 2
- Image-dominant risk: 0
- Table-dominant risk: 0
- Link-list dominant risk: 150

The link-list flag is diagnostic: many unfinished L3 skeleton pages reuse navigation, FAQ links, and related-page lists around a short body. It does not mean the page contains literally no prose.

## All Pages

| URL | HTML words | Markdown words | H1 | H2 | Images | Tables | Grade | Flags |
|---|---:|---:|---:|---:|---:|---:|---|---|
| / | 386 | 0 | 1 | 7 | 7 | 0 | Yellow | - |
| /accessories | 2235 | 1100 | 1 | 16 | 4 | 2 | Green | - |
| /accessories/accessories-faq | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-effects | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-gacha | 1231 | 1184 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/accessory-inventory | 133 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-rarity | 1241 | 1198 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/accessory-roll-system | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-selection-guide | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-stats | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-tickets-guide | 1248 | 1199 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/accessory-tiers | 1246 | 1201 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/accessory-updates | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-value-comparison | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/accessory-values | 1232 | 1190 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/beginner-accessories | 138 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/best-accessories | 133 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/black-rose | 200 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /accessories/common-accessories | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/complete-accessories-list | 1241 | 1195 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/cosmetic-accessories | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/deep-web | 200 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /accessories/duplicate-accessories | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/event-accessories | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/hacker | 192 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /accessories/how-to-equip-accessories | 143 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/how-to-farm-accessory-tickets | 154 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/how-to-get-accessories | 1248 | 1195 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/how-to-roll-accessories | 1242 | 1192 | 1 | 9 | 0 | 1 | Green | - |
| /accessories/how-to-spend-accessory-tickets | 151 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/limited-accessories | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/new-accessories | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/rare-accessories | 133 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /accessories/seraphim | 191 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /accessories/sleepingbeauty | 191 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /accessories/void | 191 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /codes | 1223 | 1097 | 1 | 16 | 0 | 2 | Green | - |
| /codes/accessory-ticket-codes | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/already-redeemed-code | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/beginner-code-rewards | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/boost-item-codes | 137 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/case-sensitive-codes | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-expiration | 128 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-history | 127 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-release-guide | 133 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-rewards | 125 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-status | 128 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-troubleshooting | 130 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/code-verification | 126 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/codes-after-update | 137 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/codes-faq | 125 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/codes-not-working | 1232 | 1180 | 1 | 9 | 0 | 1 | Green | - |
| /codes/codes-with-free-items | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/enchant-book-codes | 138 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/event-codes | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/expired-codes | 1230 | 1183 | 1 | 9 | 0 | 1 | Green | - |
| /codes/how-to-redeem-codes | 1229 | 1174 | 1 | 9 | 0 | 1 | Green | - |
| /codes/invalid-code-error | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/mobile-code-redemption | 1236 | 1185 | 1 | 9 | 0 | 1 | Green | - |
| /codes/new-codes | 1223 | 1178 | 1 | 9 | 0 | 1 | Green | - |
| /codes/pc-code-redemption | 1233 | 1184 | 1 | 9 | 0 | 1 | Green | - |
| /codes/update-codes | 130 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /codes/where-to-enter-codes | 1229 | 1176 | 1 | 9 | 0 | 1 | Green | - |
| /codes/working-codes | 1221 | 1178 | 1 | 9 | 0 | 1 | Green | - |
| /codes/xbox-code-redemption | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins | 1333 | 1096 | 1 | 15 | 4 | 2 | Green | - |
| /coins/calendar-coin | 181 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/clover-coin | 196 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/coin-comparison | 1235 | 1190 | 1 | 9 | 0 | 1 | Green | - |
| /coins/coin-enchantments | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-farming | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-flip-guide | 1228 | 1180 | 1 | 9 | 0 | 1 | Green | - |
| /coins/coin-fountain | 1223 | 1179 | 1 | 9 | 0 | 1 | Green | - |
| /coins/coin-inventory | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-luck | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-price | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-profit | 133 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-rarity | 1236 | 1192 | 1 | 9 | 0 | 1 | Green | - |
| /coins/coin-updates | 131 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/coin-values | 1228 | 1184 | 1 | 9 | 0 | 1 | Green | - |
| /coins/coins-faq | 130 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/complete-coin-list | 1235 | 1189 | 1 | 9 | 0 | 1 | Green | - |
| /coins/dalgona-coin | 187 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/early-game-coins | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/event-coins | 130 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/friendship-coin | 197 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/graph-coin | 186 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/how-to-enchant-coins | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/how-to-equip-coins | 143 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/how-to-get-coins | 1241 | 1189 | 1 | 9 | 0 | 1 | Green | - |
| /coins/how-to-roll-coins | 1236 | 1186 | 1 | 9 | 0 | 1 | Green | - |
| /coins/how-to-switch-coins | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/late-game-coins | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/limited-coins | 130 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/lock-coin | 181 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/mid-game-coins | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/new-coins | 131 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/plush-toy-coin | 194 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/rare-coins | 129 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/rhythm-coin | 179 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/secret-coins | 129 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/slime-coin | 187 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /coins/starter-coin-guide | 138 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /coins/zone-coin | 180 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /database | 1352 | 1080 | 1 | 16 | 6 | 1 | Green | - |
| /database/accessories | 251 | 0 | 1 | 1 | 0 | 1 | Red | Thin Content |
| /database/accessory-comparison | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/accessory-database | 1226 | 1182 | 1 | 9 | 0 | 1 | Green | - |
| /database/acquisition-index | 1235 | 1186 | 1 | 9 | 0 | 1 | Green | - |
| /database/beginner-lookup | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/code-rewards | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/coin-comparison | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/coin-database | 1225 | 1182 | 1 | 9 | 0 | 1 | Green | - |
| /database/coins | 398 | 0 | 1 | 1 | 0 | 1 | Yellow | - |
| /database/content-index | 1234 | 1186 | 1 | 9 | 0 | 1 | Green | - |
| /database/data-accuracy | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/database-changelog | 131 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/database-faq | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/event-content | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/farming-lookup | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/glossary | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/item-comparison | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/item-database | 1225 | 1182 | 1 | 9 | 0 | 1 | Green | - |
| /database/items | 527 | 0 | 1 | 1 | 0 | 1 | Yellow | - |
| /database/limited-content | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/location-index | 1228 | 1182 | 1 | 9 | 0 | 1 | Green | - |
| /database/mechanics-index | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/new-entries | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/rarity-index | 1233 | 1187 | 1 | 9 | 0 | 1 | Green | - |
| /database/recently-updated | 142 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/rewards-index | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/source-index | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/tier-index | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/update-history | 138 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /database/value-list | 1636 | 1179 | 1 | 9 | 0 | 2 | Green | - |
| /database/verification-log | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /faq | 78 | 0 | 1 | 4 | 0 | 0 | Red | Thin Content |
| /guides | 1194 | 1085 | 1 | 14 | 0 | 1 | Green | - |
| /guides/accessory-rolling-guide | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/another-station | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/beginner-guide | 1343 | 1172 | 1 | 17 | 0 | 1 | Green | - |
| /guides/beginner-mistakes | 131 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/boosts-guide | 131 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/controls | 1219 | 1174 | 1 | 9 | 0 | 1 | Green | - |
| /guides/enchantment-guide | 130 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/event-preparation | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/farming-guide | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/fountain-guide | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/game-mechanics | 119 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/getting-started | 1223 | 1176 | 1 | 9 | 0 | 1 | Green | - |
| /guides/how-to-earn-money | 1246 | 1190 | 1 | 9 | 0 | 1 | Green | - |
| /guides/how-to-flip-coins | 1231 | 1174 | 1 | 9 | 0 | 1 | Green | - |
| /guides/how-to-get-accessories | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/how-to-roll-better-coins | 147 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/inventory-guide | 129 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/map-exploration | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/mobile-controls | 1224 | 1173 | 1 | 9 | 0 | 1 | Green | - |
| /guides/pc-controls | 1220 | 1172 | 1 | 9 | 0 | 1 | Green | - |
| /guides/progression-guide | 94 | 0 | 1 | 4 | 0 | 0 | Red | Thin Content |
| /guides/scroll-guide | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/skateboard-controls | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/skateboard-guide | 132 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/station-travel | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/ticket-guide | 131 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/tips-and-tricks | 84 | 0 | 1 | 4 | 0 | 0 | Red | Thin Content |
| /guides/update-preparation | 137 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /guides/xbox-controls | 1223 | 1172 | 1 | 9 | 0 | 1 | Green | - |
| /items | 1298 | 1084 | 1 | 14 | 4 | 2 | Green | - |
| /items/accessory-ticket | 200 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /items/accessory-tickets | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/best-beginner-items | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/boardmarker-1 | 173 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/boardmarker-2 | 173 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/boardmarker-3 | 173 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/boardmarker-4 | 173 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/boardmarker-5 | 173 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/boost-items | 1230 | 1189 | 1 | 9 | 0 | 1 | Green | - |
| /items/code-reward-items | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/complete-item-list | 1233 | 1186 | 1 | 9 | 0 | 1 | Green | - |
| /items/consumable-items | 1229 | 1189 | 1 | 9 | 0 | 1 | Green | - |
| /items/enchant-book | 198 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /items/enchant-books | 1223 | 1181 | 1 | 9 | 0 | 1 | Green | - |
| /items/energy-boost-items | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/engraving-scroll | 198 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /items/engraving-scrolls | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/event-items | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/how-to-get-items | 1235 | 1186 | 1 | 9 | 0 | 1 | Green | - |
| /items/how-to-use-items | 143 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/inventory-guide | 1230 | 1187 | 1 | 9 | 0 | 1 | Green | - |
| /items/item-drops | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-farming | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-locations | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-progression-guide | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-rarity | 1232 | 1189 | 1 | 9 | 0 | 1 | Green | - |
| /items/item-rewards | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-tiers-explained | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-uses | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/item-values | 1224 | 1181 | 1 | 9 | 0 | 1 | Green | - |
| /items/items-faq | 136 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/limited-items | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/luck-boost-items | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/money-boost-items | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/new-items | 134 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/rare-items | 135 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/skateboard | 200 | 0 | 1 | 7 | 1 | 0 | Red | Thin Content |
| /items/spray-1 | 178 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/spray-2 | 178 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/spray-3 | 178 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/spray-4 | 178 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/spray-5 | 178 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content; Link-list dominant risk |
| /items/vip-skateboard | 190 | 0 | 1 | 6 | 1 | 0 | Red | Thin Content |
| /tier-list | 1209 | 1122 | 1 | 15 | 0 | 2 | Green | - |
| /tier-list/a-tier-coins | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/accessory-roll-priority | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/accessory-tier-list | 1241 | 1195 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/accessory-value-tier-list | 144 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/b-tier-coins | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/beginner-coin-tier-list | 1247 | 1196 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/best-coins | 1248 | 1201 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/boost-tier-list | 140 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/c-tier-coins | 142 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/coin-profit-tier-list | 1243 | 1194 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/coin-roll-priority | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/consumable-tier-list | 141 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/cosmetic-accessory-tier-list | 144 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/early-game-tier-list | 145 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/enchant-book-tier-list | 144 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/enchantment-tier-list | 1239 | 1192 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/event-item-tier-list | 144 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/farming-coin-tier-list | 1247 | 1197 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/how-tier-rankings-work | 142 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/item-tier-list | 1242 | 1195 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/late-game-tier-list | 143 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/mid-game-tier-list | 144 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/rarity-vs-value | 1236 | 1190 | 1 | 9 | 0 | 1 | Green | - |
| /tier-list/s-tier-coins | 139 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/ticket-value-tier-list | 145 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/tier-list-methodology | 138 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/tier-list-update-changes | 150 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /tier-list/upgrade-priority-tier-list | 144 | 0 | 1 | 8 | 0 | 0 | Red | Thin Content; Link-list dominant risk |
| /updates | 39 | 0 | 1 | 1 | 0 | 0 | Red | Thin Content; Title-only / minimal body risk |
| /wiki | 49 | 0 | 1 | 1 | 0 | 0 | Red | Thin Content; Title-only / minimal body risk |

