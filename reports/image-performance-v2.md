# Phase 18 — Image Performance Optimization

Audit date: 2026-09-06  
Source directory: `public/images/wiki/`

## Result

**PASS.** All 31 original PNG files were retained. Each source now has an AVIF primary asset, a WebP compatibility asset, and a 1200×630 WebP social-preview asset. Rendered wiki images use a `<picture>` chain in this order:

1. AVIF
2. WebP
3. Original PNG fallback

The browser test selected AVIF on both the homepage and a database detail page. Existing PNG paths remain valid, so the JSON image bindings did not need to change.

## Aggregate size comparison

| Asset set | Files | Total size | Change from source PNG |
|---|---:|---:|---:|
| Original PNG sources | 31 | 43.10 MiB | Baseline |
| AVIF primary assets | 31 | 2.04 MiB | **95.3% smaller** |
| WebP fallback assets | 31 | 4.78 MiB | **88.9% smaller** |
| 1200×630 OG WebP assets | 31 | 1.81 MiB | Dedicated social previews |

The required 70% reduction target is exceeded by both modern display formats. The deployed directory contains all fallback formats, but a compatible browser downloads only its selected source rather than all three display formats.

## Implementation checks

- PNG originals retained: **31/31**
- AVIF variants: **31/31**
- WebP variants: **31/31**
- 1200×630 OG WebP variants: **31/31**
- Display image dimensions: **1254×1254** across PNG, WebP, and AVIF
- OG image dimensions: **1200×630**
- Generated `<picture>` elements: **56**
- Generated AVIF/WebP `<source>` elements: **112**
- Missing generated assets: **0**
- Broken image references: **0**
- Browser image errors: **0**
- Page-level horizontal overflow after component changes: **0 px** on the homepage and sampled detail page
- AVIF visual fidelity check: average PSNR **38.0 dB**, minimum **31.6 dB**

## SEO and build invariants

- Pages: **242**
- Sitemap URLs: **242**
- Canonical: **242/242**
- JSON-LD blocks: **578**
- JSON-LD parse errors: **0**
- `og:url`: unchanged
- Canonical URLs: unchanged
- Schema URLs and structure: unchanged
- OG images using optimized 1200×630 WebP: **242/242**
- `npm run build`: **PASS**

## Per-file results

“Saving” compares the browser-preferred AVIF file with its original PNG source.

| Source file | Original | AVIF primary | WebP fallback | Saving | Format chain |
|---|---:|---:|---:|---:|---|
| `accessories/black-rose.png` | 1559.6 KiB | 101.2 KiB | 286.0 KiB | 93.5% | PNG → AVIF / WebP / PNG fallback |
| `accessories/deep-web.png` | 1642.0 KiB | 130.8 KiB | 304.5 KiB | 92.0% | PNG → AVIF / WebP / PNG fallback |
| `accessories/hacker.png` | 2000.0 KiB | 91.3 KiB | 235.4 KiB | 95.4% | PNG → AVIF / WebP / PNG fallback |
| `accessories/seraphim.png` | 1521.1 KiB | 124.1 KiB | 287.0 KiB | 91.8% | PNG → AVIF / WebP / PNG fallback |
| `accessories/sleepingbeauty.png` | 1388.1 KiB | 118.1 KiB | 245.6 KiB | 91.5% | PNG → AVIF / WebP / PNG fallback |
| `accessories/void.png` | 1661.5 KiB | 127.2 KiB | 345.5 KiB | 92.3% | PNG → AVIF / WebP / PNG fallback |
| `coins/calendar-coin.png` | 2560.9 KiB | 115.6 KiB | 294.2 KiB | 95.5% | PNG → AVIF / WebP / PNG fallback |
| `coins/clover-coin.png` | 1717.9 KiB | 69.1 KiB | 165.2 KiB | 96.0% | PNG → AVIF / WebP / PNG fallback |
| `coins/dalgona-coin.png` | 1210.5 KiB | 42.8 KiB | 89.0 KiB | 96.5% | PNG → AVIF / WebP / PNG fallback |
| `coins/friendship-coin.png` | 1858.2 KiB | 58.3 KiB | 140.0 KiB | 96.9% | PNG → AVIF / WebP / PNG fallback |
| `coins/graph-coin.png` | 1632.8 KiB | 52.6 KiB | 132.6 KiB | 96.8% | PNG → AVIF / WebP / PNG fallback |
| `coins/lock-coin.png` | 2960.7 KiB | 124.3 KiB | 338.3 KiB | 95.8% | PNG → AVIF / WebP / PNG fallback |
| `coins/plush-toy-coin.png` | 1727.9 KiB | 73.9 KiB | 141.1 KiB | 95.7% | PNG → AVIF / WebP / PNG fallback |
| `coins/rhythm-coin.png` | 1655.7 KiB | 47.8 KiB | 111.0 KiB | 97.1% | PNG → AVIF / WebP / PNG fallback |
| `coins/slime-coin.png` | 1146.7 KiB | 53.0 KiB | 128.4 KiB | 95.4% | PNG → AVIF / WebP / PNG fallback |
| `coins/zone-coin.png` | 1804.4 KiB | 69.0 KiB | 182.1 KiB | 96.2% | PNG → AVIF / WebP / PNG fallback |
| `items/accessory-ticket.png` | 1396.5 KiB | 56.8 KiB | 123.8 KiB | 95.9% | PNG → AVIF / WebP / PNG fallback |
| `items/boardmarker-1.png` | 867.3 KiB | 39.8 KiB | 86.2 KiB | 95.4% | PNG → AVIF / WebP / PNG fallback |
| `items/boardmarker-2.png` | 698.5 KiB | 32.9 KiB | 68.8 KiB | 95.3% | PNG → AVIF / WebP / PNG fallback |
| `items/boardmarker-3.png` | 958.2 KiB | 51.9 KiB | 105.6 KiB | 94.6% | PNG → AVIF / WebP / PNG fallback |
| `items/boardmarker-4.png` | 867.8 KiB | 44.5 KiB | 86.9 KiB | 94.9% | PNG → AVIF / WebP / PNG fallback |
| `items/boardmarker-5.png` | 986.6 KiB | 41.3 KiB | 85.3 KiB | 95.8% | PNG → AVIF / WebP / PNG fallback |
| `items/enchant-book.png` | 1817.3 KiB | 65.3 KiB | 162.2 KiB | 96.4% | PNG → AVIF / WebP / PNG fallback |
| `items/engraving-scroll.png` | 1259.2 KiB | 54.9 KiB | 114.4 KiB | 95.6% | PNG → AVIF / WebP / PNG fallback |
| `items/skateboard.png` | 1165.5 KiB | 56.4 KiB | 113.7 KiB | 95.2% | PNG → AVIF / WebP / PNG fallback |
| `items/spray-1.png` | 953.8 KiB | 34.2 KiB | 76.1 KiB | 96.4% | PNG → AVIF / WebP / PNG fallback |
| `items/spray-2.png` | 810.6 KiB | 32.1 KiB | 63.8 KiB | 96.0% | PNG → AVIF / WebP / PNG fallback |
| `items/spray-3.png` | 946.0 KiB | 37.6 KiB | 78.9 KiB | 96.0% | PNG → AVIF / WebP / PNG fallback |
| `items/spray-4.png` | 1055.7 KiB | 34.5 KiB | 73.8 KiB | 96.7% | PNG → AVIF / WebP / PNG fallback |
| `items/spray-5.png` | 1121.2 KiB | 51.9 KiB | 112.6 KiB | 95.4% | PNG → AVIF / WebP / PNG fallback |
| `items/vip-skateboard.png` | 1181.0 KiB | 55.3 KiB | 119.3 KiB | 95.3% | PNG → AVIF / WebP / PNG fallback |

## Notes

- Original PNG files remain the compatibility and failure fallback; no source artwork was regenerated or overwritten.
- JSON data and existing `.png` image values remain unchanged.
- `loading`, `decoding`, intrinsic width, intrinsic height, and fetch priority are preserved so layout dimensions remain stable and above-the-fold images are not unintentionally delayed.
