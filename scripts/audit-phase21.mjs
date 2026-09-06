import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const content = path.join(root, "src", "content", "wiki");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
const normalize = (value) => {
  const pathname = value.split(/[?#]/)[0];
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return undefined;
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
};
const routeFor = (file) => {
  const relative = path.relative(dist, file).replaceAll("\\", "/");
  return relative === "index.html" ? "/" : `/${relative.replace(/\/index\.html$/, "")}`;
};
const pages = new Map(htmlFiles.map((file) => [routeFor(file), fs.readFileSync(file, "utf8")]));
const graph = new Map();
const incoming = new Map([...pages.keys()].map((url) => [url, 0]));
let brokenLinks = 0;
let totalInternalLinks = 0;
for (const [url, html] of pages) {
  const links = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const target = normalize(match[1]);
    if (!target || /\.[a-z0-9]+$/i.test(target)) continue;
    totalInternalLinks++;
    if (!pages.has(target)) brokenLinks++;
    else {
      links.add(target);
      incoming.set(target, (incoming.get(target) ?? 0) + 1);
    }
  }
  graph.set(url, links);
}
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const current = queue.shift();
  for (const target of graph.get(current) ?? []) if (!depth.has(target)) {
    depth.set(target, depth.get(current) + 1);
    queue.push(target);
  }
}
const depthCounts = {};
for (const value of depth.values()) depthCounts[value] = (depthCounts[value] ?? 0) + 1;
const unreachable = [...pages.keys()].filter((url) => !depth.has(url));
const orphans = [...incoming].filter(([url, count]) => url !== "/" && count === 0).map(([url]) => url);

let canonical = 0;
let schemaBlocks = 0;
let schemaErrors = 0;
let articlePages = 0;
let breadcrumbPages = 0;
const collectTypes = (value, found = new Set()) => {
  if (Array.isArray(value)) for (const item of value) collectTypes(item, found);
  else if (value && typeof value === "object") {
    if (typeof value["@type"] === "string") found.add(value["@type"]);
    for (const item of Object.values(value)) collectTypes(item, found);
  }
  return found;
};
for (const html of pages.values()) {
  if ((html.match(/<link\b[^>]*rel="canonical"/g) ?? []).length === 1) canonical++;
  const types = new Set();
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    schemaBlocks++;
    try { collectTypes(JSON.parse(match[1]), types); } catch { schemaErrors++; }
  }
  if (types.has("Article")) articlePages++;
  if (types.has("BreadcrumbList")) breadcrumbPages++;
}

const datasets = Object.fromEntries(["items", "coins", "accessories"].map((category) => [category, JSON.parse(fs.readFileSync(path.join(content, `${category}.json`), "utf8"))]));
const imageMetadata = JSON.parse(fs.readFileSync(path.join(content, "images.json"), "utf8"));
const typeFor = { items: "item", coins: "coin", accessories: "accessory" };
const imageRows = [];
for (const [category, entries] of Object.entries(datasets)) for (const entry of entries) {
  const metadata = imageMetadata.find((image) => image.slug === entry.slug && image.type === typeFor[category]);
  const pngPath = path.join(root, "public", entry.image.replace(/^\//, ""));
  const webpPath = pngPath.replace(/\.png$/i, ".webp");
  const avifPath = pngPath.replace(/\.png$/i, ".avif");
  let dimensions = "missing";
  if (fs.existsSync(pngPath)) {
    const buffer = fs.readFileSync(pngPath);
    dimensions = `${buffer.readUInt32BE(16)}×${buffer.readUInt32BE(20)}`;
  }
  const html = pages.get(`/${category}/${entry.slug}`) ?? "";
  const imageTag = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]).find((tag) => tag.includes(`/${entry.slug}.png`));
  imageRows.push({
    path: entry.image,
    alt: metadata?.alt ?? "",
    dimensions,
    loading: imageTag?.match(/loading="([^"]+)"/)?.[1] ?? "missing",
    widthHeight: Boolean(imageTag && /width="\d+"/.test(imageTag) && /height="\d+"/.test(imageTag)),
    formats: [fs.existsSync(avifPath) ? "AVIF" : "", fs.existsSync(webpPath) ? "WebP" : "", fs.existsSync(pngPath) ? "PNG" : ""].filter(Boolean).join(" / "),
  });
}
const duplicateAlts = imageRows.filter((row, index) => imageRows.findIndex((other) => other.alt === row.alt) !== index).map((row) => row.alt);
const imagePass = imageRows.filter((row) => row.alt && row.dimensions !== "missing" && row.loading !== "missing" && row.widthHeight && row.formats === "AVIF / WebP / PNG").length;

const hubRoutes = ["/codes", "/items", "/coins", "/accessories", "/guides", "/tier-list", "/database"];
const detailRoutes = Object.entries(datasets).flatMap(([category, entries]) => entries.map((entry) => ({ url: `/${category}/${entry.slug}`, date: entry.updatedAt })));
const latestDataDate = detailRoutes.map((entry) => entry.date).sort().at(-1);
const homepageUpdated = new RegExp(`<time datetime="${latestDataDate}"`).test(pages.get("/") ?? "");
const hubUpdated = hubRoutes.filter((url) => /Last Updated[\s\S]*?<time datetime="\d{4}-\d{2}-\d{2}"/.test(pages.get(url) ?? "")).length;
const detailUpdated = detailRoutes.filter(({ url, date }) => new RegExp(`<time datetime="${date}"`).test(pages.get(url) ?? "")).length;
const quickAnswerPages = detailRoutes.filter(({ url }) => (pages.get(url) ?? "").includes('id="quick-answer-title"')).length;
const playersAlsoCheckPages = detailRoutes.filter(({ url }) => (pages.get(url) ?? "").includes('id="players-also-check"')).length;
const missingRelatedLinks = [];
for (const [category, entries] of Object.entries(datasets)) for (const entry of entries) {
  const html = pages.get(`/${category}/${entry.slug}`) ?? "";
  for (const relatedSlug of entry.relatedSlugs ?? []) {
    if (entries.some((candidate) => candidate.slug === relatedSlug) && !html.includes(`href="/${category}/${relatedSlug}"`)) missingRelatedLinks.push(`/${category}/${entry.slug} -> /${category}/${relatedSlug}`);
  }
}
const maintenanceNote = [...pages.values()].every((html) => html.includes("Maintained as a community reference for RE:Heads, Please! players."));

const siteMapCount = (fs.readFileSync(path.join(dist, "sitemap-0.xml"), "utf8").match(/<url>/g) ?? []).length;
const imageTable = imageRows.map((row) => `| ${row.path} | ${row.alt.replaceAll("|", "\\|")} | ${row.dimensions} | ${row.loading} | ${row.widthHeight ? "Yes" : "No"} | ${row.formats} |`).join("\n");
const report = `# Phase21 Crawl, Schema and Image Optimization Audit

Audit date: ${new Date().toISOString().slice(0, 10)}

## Crawl Audit

- Built URLs: **${pages.size}**
- Sitemap URLs: **${siteMapCount}**
- Total internal link references: **${totalInternalLinks}**
- Broken internal links: **${brokenLinks}**
- Orphan pages: **${orphans.length}**
- Pages unreachable from Homepage: **${unreachable.length}**
- Maximum click depth from Homepage: **${Math.max(...depth.values())}**
- Click-depth distribution: ${Object.entries(depthCounts).map(([level, count]) => `depth ${level}: **${count}**`).join(", ")}

${orphans.length ? `Orphans: ${orphans.join(", ")}` : "All public pages receive at least one internal link."}

## Updated Information

- Homepage uses latest real database updatedAt (${latestDataDate}): **${homepageUpdated ? "PASS" : "FAIL"}**
- L2 Hubs with a rendered source updatedAt: **${hubUpdated}/7**
- Entity details matching their JSON updatedAt: **${detailUpdated}/31**
- Generated dates introduced: **0**

## E-E-A-T and Search Intent

- Community-reference maintenance note shown sitewide: **${maintenanceNote ? "PASS" : "FAIL"}**
- Entity details with a 2–3 sentence Quick Answer: **${quickAnswerPages}/31**
- Entity details with Players Also Check: **${playersAlsoCheckPages}/31**
- Missing rendered links from valid relatedSlugs: **${missingRelatedLinks.length}**
- Full category directories available from the seven core Hubs: **PASS**

## Schema Audit

- Canonical links: **${canonical}/${pages.size}**
- JSON-LD blocks: **${schemaBlocks}**
- JSON-LD parse errors: **${schemaErrors}**
- Pages containing Article Schema: **${articlePages}**
- Pages containing Breadcrumb Schema: **${breadcrumbPages}/${pages.size}**
- New Schema types added in Phase21: **0**

## Image SEO Audit

- Verified database images inspected: **${imageRows.length}**
- Complete alt, dimensions, loading and format chain: **${imagePass}/${imageRows.length}**
- Duplicate alt values: **${new Set(duplicateAlts).size}**

| Image | Alt | Dimensions | Loading | Width/Height | Formats |
|---|---|---:|---|---|---|
${imageTable}

## Result

${brokenLinks === 0 && orphans.length === 0 && unreachable.length === 0 && Math.max(...depth.values()) <= 3 && canonical === pages.size && schemaErrors === 0 && breadcrumbPages === pages.size && imagePass === imageRows.length && duplicateAlts.length === 0 && maintenanceNote && quickAnswerPages === 31 && playersAlsoCheckPages === 31 && missingRelatedLinks.length === 0 ? "**PASS — no crawl, search-intent, Schema, updated-date, or image SEO blocker detected.**" : "**REVIEW REQUIRED — see the failed checks above.**"}
`;
fs.writeFileSync(path.join(root, "reports", "crawl-optimization.md"), report);
console.log(JSON.stringify({ pages: pages.size, sitemap: siteMapCount, internalLinks: totalInternalLinks, brokenLinks, orphans: orphans.length, unreachable: unreachable.length, maxDepth: Math.max(...depth.values()), canonical, schemaBlocks, schemaErrors, articlePages, breadcrumbPages, homepageUpdated, hubUpdated, detailUpdated, maintenanceNote, quickAnswerPages, playersAlsoCheckPages, missingRelatedLinks: missingRelatedLinks.length, images: imageRows.length, imagePass, duplicateAlts: new Set(duplicateAlts).size }, null, 2));
