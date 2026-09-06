import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const wiki = path.join(root, "src", "content", "wiki");
const keywords = JSON.parse(fs.readFileSync(path.join(wiki, "keywords.json"), "utf8"));
const datasets = Object.fromEntries(["items", "coins", "accessories"].map((name) => [name, JSON.parse(fs.readFileSync(path.join(wiki, `${name}.json`), "utf8"))]));
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = walk(dist).filter((file) => file.endsWith(".html"));
const strip = (html) => html
  .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
  .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z0-9#]+;/gi, " ")
  .replace(/\s+/g, " ")
  .trim();
const countWords = (text) => (text.match(/\b[A-Za-z][A-Za-z'’-]*\b/g) ?? []).length;
const routeFor = (file) => {
  const relative = path.relative(dist, file).replaceAll("\\", "/");
  return relative === "index.html" ? "/" : `/${relative.replace(/\/index\.html$/, "")}`;
};
const l2 = new Map(keywords.l2.map((category) => [category.slug, category]));
const keywordMap = new Map([["/", { keyword: keywords.l1.keyword, intent: "navigational" }]]);
for (const category of keywords.l2) {
  keywordMap.set(`/${category.slug}`, { keyword: category.keyword, intent: "navigational" });
  for (const page of category.l3) keywordMap.set(`/${category.slug}/${page.slug}`, { keyword: page.keyword, intent: page.intent });
}
for (const [category, entries] of Object.entries(datasets)) {
  for (const entry of entries) keywordMap.set(`/${category}/${entry.slug}`, { keyword: entry.keywords?.[0] ?? `RE:Heads, Please! ${entry.name}`, intent: "entity lookup" });
}
const mdxRoutes = new Set(walk(wiki).filter((file) => file.endsWith(".mdx")).map((file) => {
  const relative = path.relative(wiki, file).replaceAll("\\", "/").replace(/\.mdx$/, "");
  return relative.endsWith("/index") ? `/${relative.replace(/\/index$/, "")}` : `/${relative}`;
}));
const classify = (url) => {
  if (url === "/") return "Homepage";
  const parts = url.split("/").filter(Boolean);
  if (["items", "coins", "accessories"].includes(parts[0]) && parts.length === 2 && datasets[parts[0]].some((entry) => entry.slug === parts[1])) return "Entity Detail";
  if (parts.length === 1 && l2.has(parts[0])) return "L2 Hub";
  if (parts[0] === "guides") return "Guide";
  if (mdxRoutes.has(url)) return "MDX Article";
  if (parts[0] === "database" && ["items", "coins", "accessories"].includes(parts[1])) return "Database Category";
  return parts.length === 1 ? "Utility Page" : "Generated Article";
};
const rows = pages.map((file) => {
  const html = fs.readFileSync(file, "utf8");
  const url = routeFor(file);
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
  const words = countWords(strip(main));
  const type = classify(url);
  const mapped = keywordMap.get(url);
  const title = strip(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const keyword = mapped?.keyword ?? title.replace(/\s*[|–-]\s*RE:Heads[\s\S]*$/i, "");
  const intent = mapped?.intent ?? (type === "Utility Page" ? "navigational" : "informational");
  let needed = "Editorial review only";
  if (words < 300) needed = "High: expand thin content";
  else if (type === "Homepage") needed = "Add 300–500 word game introduction";
  else if (type === "L2 Hub") needed = "Normalize Summary, Data Preview, Main Content, How To Use, FAQ, Related Pages";
  else if (type === "Entity Detail") needed = "Expand entity Overview, acquisition, Usage, Tips, Related, and FAQ";
  else if (type === "Guide" && !/id="mistakes"|>Mistakes</i.test(html)) needed = "Add guide-specific mistakes and differentiated FAQ guidance";
  else if (!mdxRoutes.has(url) && type === "Generated Article") needed = "Reduce generated-template similarity with intent-specific context";
  return { url, keyword, intent, words, type, needed };
}).sort((a, b) => a.url.localeCompare(b.url));
const counts = rows.reduce((result, row) => {
  result.total++;
  if (row.words < 300) result.thin++;
  if (row.words >= 300) result.over300++;
  if (row.words >= 800) result.over800++;
  return result;
}, { total: 0, thin: 0, over300: 0, over800: 0 });
const escape = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const output = [
  "# Phase20 Content Optimization Plan",
  "",
  `Audit date: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "## Baseline",
  "",
  `- Total public pages: **${counts.total}**`,
  `- Pages with 300+ rendered words: **${counts.over300}**`,
  `- Pages with 800+ rendered words: **${counts.over800}**`,
  `- Thin pages below 300 words: **${counts.thin}**`,
  "- Word counts use rendered `<main>` text and exclude scripts, styles, and navigation.",
  "- This plan does not propose URL, metadata, Schema, JSON, or image-system changes.",
  "",
  "## Page-by-page plan",
  "",
  "| URL | Keyword | Intent | Word Count | Content Type | Optimization Needed |",
  "|---|---|---|---:|---|---|",
  ...rows.map((row) => `| ${escape(row.url)} | ${escape(row.keyword)} | ${escape(row.intent)} | ${row.words} | ${escape(row.type)} | ${escape(row.needed)} |`),
  "",
];
fs.mkdirSync(path.join(root, "reports"), { recursive: true });
fs.writeFileSync(path.join(root, "reports", "content-optimization-plan.md"), output.join("\n"));
console.log(JSON.stringify(counts));
