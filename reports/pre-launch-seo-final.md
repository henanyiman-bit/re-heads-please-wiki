# Phase 17 — Pre-Launch SEO Final Audit

Audit date: 2026-09-06  
Production origin: `https://reheadsplease.ymmyi.wiki`  
Audit target: Astro static production output in `dist/`

## Executive verdict

**Launch readiness: PASS, with one high-priority non-blocking performance risk.**

The production build generated 242 pages. All 242 routes returned HTTP 200 from the local production preview, matched the sitemap, used an absolute self-referencing canonical, exposed the required Open Graph metadata, and contained valid JSON-LD with a Breadcrumb schema. The internal-link graph has no broken links and no orphan pages.

There are no technical SEO blockers in the generated site. The main remaining risk is image weight: the 31 wiki PNG assets total 43.1 MiB, and individual images range up to 2.89 MiB. Lazy loading limits the initial cost on hubs, but entity detail pages eagerly load one large image and may have weak LCP on slower mobile connections. This does not prevent deployment, but image optimization should be the first post-audit task.

## Audit results

| Area | Result | Evidence |
|---|---:|---|
| Production build | PASS | `npm run build` completed successfully; 242 pages generated |
| Full URL crawl | PASS | 242/242 sitemap routes returned HTTP 200 and `text/html` |
| Sitemap consistency | PASS | 242 URLs; 0 duplicates, 0 missing build routes, 0 extra routes |
| Robots | PASS | Global allow rule and absolute production sitemap URL present |
| Canonical | PASS | 242/242 pages have exactly one correct absolute self-canonical |
| Internal links | PASS | 0 broken internal links |
| Orphan pages | PASS | 0 pages without an inbound internal link, excluding the homepage |
| Schema | PASS | 0 JSON parse errors; 0 relative schema URLs; Breadcrumb 242/242 |
| Open Graph | PASS | Required OG fields present exactly once on 242/242 pages; absolute `og:url` and `og:image` |
| Twitter metadata | PASS | Card, title, description, and absolute image present on 242/242 pages |
| Mobile SEO | PASS | `lang`, charset, viewport, and one H1 present on 242/242 pages |
| Mobile layout sample | PASS | 24 route/viewport checks; 0 px page-level horizontal overflow |
| Image integrity | PASS | 31/31 local wiki PNG files; 0 external `<img>` sources |
| Basic performance | RISK | Large PNG payloads; details below |

## 1. Full URL crawl

- Public HTML routes discovered: **242**
- Duplicate generated routes: **0**
- Local production-preview requests: **242**
- HTTP 200 responses: **242**
- Non-200 responses: **0**
- Unexpected content types: **0**

The crawl used the URLs emitted by the production sitemap and requested each route against the Astro production preview.

## 2. Sitemap consistency

- Sitemap index: `/sitemap-index.xml`
- Child sitemap: `/sitemap-0.xml`
- Sitemap URLs: **242**
- Build routes: **242**
- Missing from sitemap: **0**
- Extra sitemap URLs: **0**
- Duplicate sitemap URLs: **0**
- Non-production or relative sitemap URLs: **0**

The sitemap index points to `https://reheadsplease.ymmyi.wiki/sitemap-0.xml`.

## 3. Robots

Generated `robots.txt` contains:

```text
User-agent: *
Allow: /

Sitemap: https://reheadsplease.ymmyi.wiki/sitemap-index.xml
```

Result: **PASS**. Crawling is allowed and the sitemap declaration uses the confirmed production origin.

## 4. Canonical

- Pages checked: **242**
- Exactly one canonical: **242/242**
- Correct production origin: **242/242**
- Self-referencing route match: **242/242**
- Relative or mismatched canonicals: **0**

## 5–7. Internal links, orphan pages, and broken links

- Broken internal page or asset links: **0**
- Invalid internal href values: **0**
- Orphan pages: **0**
- External anchor destinations: **0**

Every non-homepage route receives at least one internal link from another generated page. Sitemap inclusion was not counted as an inbound content link.

## 8. Schema

- JSON-LD parse errors: **0**
- Pages with `BreadcrumbList`: **242/242**
- Relative values in schema `url`, `@id`, `mainEntityOfPage`, or breadcrumb `item`: **0**

Observed schema objects:

| Schema type | Count |
|---|---:|
| `WebSite` | 242 |
| `BreadcrumbList` | 242 |
| `Article` | 56 |
| `WebPage` | 56 |
| `FAQPage` | 94 |
| `Question` / `Answer` | 345 / 345 |

Schema type counts reflect applicable templates and frontmatter rather than requiring Article or FAQ schema on every route.

## 9. Open Graph and social metadata

Required fields checked per page:

- `og:title`
- `og:description`
- `og:type`
- `og:url`
- `og:image`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

Result: **242/242 pass**. All `og:url`, `og:image`, and Twitter image values use the production origin. No missing or duplicate required fields were detected.

## 10. Mobile SEO

Full-output checks:

- English document language: **242/242**
- Charset declaration: **242/242**
- Responsive viewport: **242/242**
- Exactly one H1: **242/242**
- Images with explicit width and height: **56/56**
- Images with alt attributes: **56/56**
- Iframes with lazy loading and title: **6/6**

Responsive browser sample:

- Routes: homepage, Codes Hub, Items Hub, Database Hub, Enchant Book detail, Beginner Guide
- Widths: 375, 390, 412, and 768 px
- Test cases: **24**
- Page-level horizontal overflow: **0 px in 24/24 cases**
- H1 count: **1 in 24/24 cases**
- Browser console warnings/errors during the sample: **0**

The six video embeds use `https://www.youtube-nocookie.com`; this is an embedded media host, not an outbound page link.

## 11. Basic performance check

### Generated resources

| Resource | Count | Total | Largest |
|---|---:|---:|---:|
| HTML | 242 | 5.07 MiB | 57.1 KiB |
| CSS | 6 | 58.1 KiB | 18.5 KiB |
| JavaScript | 1 | 171.7 KiB | 171.7 KiB |
| Wiki PNG images | 31 | 43.1 MiB | 2.89 MiB |

Positive signals:

- Static generation avoids application-server rendering overhead.
- No external JavaScript is loaded while AdSense remains disabled.
- All 56 rendered image tags include intrinsic dimensions and async decoding.
- All image tags specify loading behavior: 24 lazy and 32 eager.
- Hub preview images are lazy-loaded.
- CSS and JavaScript bundle sizes are moderate; no individual CSS or JS asset exceeds 500 KiB.

Performance risk:

- All 31 wiki images are 1254 × 1254 PNG files larger than 500 KiB.
- The largest file is `images/wiki/coins/lock-coin.png` at 2.89 MiB.
- The homepage references 10.3 MiB of images across the full scroll; only its 1.14 MiB hero image is eager, while preview images are lazy.
- The Database Hub references 9.1 MiB and the Accessories Hub 6.7 MiB of lazy image content.
- Entity pages eagerly load their primary image, reaching approximately 3.1 MiB total static payload on the heaviest route before compression/cache effects.

Recommendation: generate responsive WebP/AVIF derivatives, retain PNG only where transparency fidelity requires it, add `srcset`/`sizes`, and target a substantially smaller mobile display asset. Re-run Lighthouse or WebPageTest against the deployed Cloudflare URL to verify LCP, CLS, and INP under throttled mobile conditions.

## Blocking items

**None found.**

No build, crawlability, indexation, canonical, sitemap, schema, internal-link, or mobile-layout defect currently blocks deployment.

## Non-blocking items

1. **High priority — image delivery:** 31 oversized PNGs create avoidable LCP and bandwidth risk, especially on detail pages.
2. **Medium priority — search bundle:** the single site-search JavaScript asset is 171.7 KiB. It is acceptable for launch, but code splitting or a smaller index payload could improve low-end mobile startup.
3. **Post-deploy validation:** local checks cannot measure Cloudflare cache behavior, compression headers, real-network Core Web Vitals, production redirects, or field data. Run an HTTPS crawl and Lighthouse after deployment.
4. **Content monitoring:** the prior content audit identified seven pages below 300 words. This is a content-quality opportunity, not a technical launch blocker, and was outside this no-content-change audit.

## Git synchronization recommendation

The generated site is technically ready to enter Git synchronization and deployment review. Before syncing, review this report and confirm that the current working tree contains only the intended project changes from earlier phases. Do not commit `dist/` unless the deployment workflow explicitly requires generated output.

Recommended sequence:

1. Review the complete diff locally.
2. Decide whether image optimization is required before initial public traffic or can be the first follow-up release.
3. Synchronize through the normal branch/review workflow.
4. Deploy to Cloudflare Pages.
5. Run a production HTTPS crawl, Lighthouse mobile test, and Search Console sitemap submission check.

No Git command was executed during this audit.

## Audit boundary

This report validates the generated static output and a local production-preview crawl. It does not claim real-user Core Web Vitals, Google indexation, CDN response headers, or production-origin availability before deployment.
