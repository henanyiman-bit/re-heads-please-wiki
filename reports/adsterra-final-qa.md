# Adsterra Full Integration — Final QA

Date: 2026-09-10

**READY FOR DEPLOYMENT: NO**

## Scope and files

Continued the existing 10-file change set. No redesigned placement strategy, Git staging/commit/push or deployment.

Modified tracked files:

- src/layouts/WikiLayout.astro
- src/components/WikiHubShell.astro
- src/components/WikiArticleShell.astro
- src/components/WikiDetail.astro

New implementation files (including the previously untracked leaderboard):

- src/components/ads/AdsterraLeaderboard.astro
- src/components/ads/AdsterraRectangle.astro
- src/components/ads/AdsterraMobileBanner.astro
- src/components/ads/AdsterraNative.astro
- src/components/ads/AdsterraFrame.astro
- src/lib/adsterra.ts

This report is the additional QA file. No Markdown/MDX article, JSON dataset, image, robots or sitemap configuration was edited.

## Components and template placements

All four components are implemented through one shared frame and conditional loader. WikiLayout enables ads on the seven core category paths and their existing descendants (238 pages); homepage and three utility pages remain ad-free.

Content banners follow the page content inside main, before the footer and outside narrow sidebar grids. Sidebar rectangles are appended after sidebar navigation/status in Hub/Guide shells, and after the complete infobox in WikiDetail, not between its fields. Generic KeywordPage articles without a sidebar receive no rectangle.

| Device | Content end | Real sidebar | Maximum |
| --- | --- | --- | --- |
| Desktop >=1024 | 728x90 | 300x250 if present and wide enough | 2 |
| Tablet 768–1023 | Native, reserved 640x320 viewport | None | 1 |
| Mobile <=767 | 320x50 | None | 1 |
| Homepage | None | None | 0 |

All slots have a neutral Advertisement label, separate borders/spacing, and reserved height. Native uses an isolated scrollable viewport; actual creative fit is unverified because the provider script failed.

## Loading and isolation

- Each active unit has its own sandboxed opaque-origin srcdoc document.
- atOptions remains local to each banner document. No provider executes in the Wiki window.
- A breakpoint check and IntersectionObserver gate iframe creation; hidden device formats do not create provider script documents on initial navigation.
- One instance per format is enforced. Native container id exists only once in its active isolated document.
- Breakpoint changes remove inactive frames. No automatic refresh: a removed unit is not re-requested by that loader instance when switching back; reload the page for a fresh ad.
- No first-screen provider request is required for content-end units. Sidebar units load when near the viewport.
- Provider error reporting is source-checked and only sets status attributes. Local DEV-only CLS diagnostics send no telemetry.
- Isolation does not guarantee a third-party script can never consume browser CPU; production performance with filled ads still requires measurement.

## Browser matrix

Accessible local preview: http://127.0.0.1:4331/

20 real pages tested at each of 375, 390, 412, 768, 1024, 1440, 1920 CSS pixels (140 combinations), including scrolling to content-end slots. Final diagnostics were also retested after implementation changes.

Sample set:

- /
- /codes/, /items/, /coins/, /accessories/, /database/, /guides/, /tier-list/
- /codes/working-codes
- /guides/beginner-guide, /guides/farming-guide
- /items/enchant-book, /items/skateboard
- /coins/dalgona-coin, /coins/lock-coin
- /accessories/seraphim, /accessories/void
- /codes/new-codes, /database/item-comparison, /accessories/accessory-gacha

| Width | Overflow | Device format and quantity | Fill |
| --- | --- | --- | --- |
| 375 | 0px | Mobile only; homepage none | Not passed |
| 390 | 0px | Mobile only; homepage none | Not passed |
| 412 | 0px | Mobile only; homepage none | Not passed |
| 768 | 0px | Native only; homepage none | Failed provider script |
| 1024 | 0px | Leaderboard + rectangle where present; <=2 | Not passed |
| 1440 | 0px | Leaderboard + rectangle where present; <=2 | Failed provider scripts |
| 1920 | 0px | Leaderboard + rectangle where present; <=2 | Not passed |

Measured iframe dimensions: 728x90, 300x250, 320x50. Content units are centered, and no tested wrapper overflowed. Per-document active formats matched the device rules. No duplicate provider script elements were generated in a unit's srcdoc. This is not a substitute for a full cross-origin Network trace.

## Real fill, errors and performance

**Blocking:** all four provider invoke.js endpoints returned HTTP 403 with zero response-body bytes on direct GET checks in this environment. Browser diagnostics separately confirmed script-error for Native and both desktop formats. Frames initialized, but no actual ad creative was observed. The 403 origin (provider policy, network filtering, domain approval or other upstream condition) has not been determined; it must not be assumed to be a code defect or an unapproved domain.

Final mobile recheck also reported script-error (all four formats now confirmed). Parent-page captured console warning/error list was empty in the inspected samples. Isolated provider script errors are recorded separately above and are not being reported as “zero errors.”

Observed local parent-document layout-shift sum was 0 during the ad-enabled sample runs; homepage is deliberately not instrumented. This only measures the blank/failed-ad state and short local observation windows, not field CLS or cross-origin creative-internal shifts. Slots remained stable when empty.

Network duplicate requests: srcdoc inspection confirmed one configured invoke script per instantiated unit, and disabled device frames were absent. A complete provider-side/subframe request waterfall and any provider-generated requests remain unverified. No ad clicks were performed.

## Site functionality

- SiteSearch: typed skateboard, received five matches and selected the Skateboard result; navigation reached /items/skateboard.
- Real image sample: Skateboard AVIF loaded successfully (natural width 1254). Image system unchanged.
- Navigation: search result navigation and all requested sample URLs worked.
- Video: existing Skateboard youtube-nocookie embed and title present; actual video playback not verified in this pass.
- Internal page/file links: build-output crawl passed (0 broken).

## Build and SEO

npm run build: SUCCESS, 242 static pages, 2.18 seconds in the final recorded build.

| Check | Result |
| --- | --- |
| Public route pages | 242 |
| Sitemap URLs | 242 |
| Self canonical | 242/242 |
| BreadcrumbList | 242/242 |
| JSON-LD blocks | 820, unchanged from baseline |
| JSON-LD parse errors | 0 |
| Broken internal page/file links | 0 |
| Homepage-unreachable / orphan pages | 0 |
| Title, description, OG/Twitter metadata, canonical and JSON-LD | Exact build-output baseline match |

The Google verification HTML is not counted as a Wiki route. Link crawl validates destinations; it does not certify every in-page fragment identifier.

## Remaining blockers and retest requirements

1. Resolve provider invoke.js failures with the ad provider/network administrator. Confirm the supplied keys and production-domain approval without changing keys speculatively.
2. Re-run real creative fill for all four formats in an accessible, provider-approved environment. No deployment was performed to bypass this requirement.
3. Recheck Native creative fit, complete Network waterfall/duplicate requests and cross-origin console behavior once scripts return usable content.
4. Measure filled-state CLS/performance and confirm video playback.

Do not enter Git synchronization or deployment while these acceptance checks remain incomplete.
