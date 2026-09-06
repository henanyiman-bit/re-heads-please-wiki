import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wiki = path.join(root, "src", "content", "wiki");
const hubCategories = ["codes", "items", "coins", "accessories", "guides", "tier-list", "database"];
const additions = {
  codes: "The live Codes module appears before this article so readers can check status before reading general guidance. Use the table to distinguish a verified result from redemption help, historical context, or troubleshooting; the absence of a published code string is intentional when no current code has passed verification.",
  items: "The live Items preview is generated from verified records rather than copied into this article. Open an entity card for its image, location, tier context, and acquisition note, or use the topic links when the question concerns inventory behavior instead of one named item.",
  coins: "The live Coins preview keeps entity records ahead of editorial explanation. A record shows documented fields only; it does not turn rarity into value, availability into profit, or a collection label into a guaranteed acquisition route.",
  accessories: "The live Accessories preview links directly to verified entity records. Use those cards for a named accessory and use the guide topics for gacha, tickets, rarity, inventory, or unlock questions that apply to a process rather than one record.",
  guides: "The guide preview groups player goals by the action they support: starting, earning resources, understanding mechanics, controlling movement, or preparing for a change. Choose the closest goal first and return to this hub when a new question appears.",
  "tier-list": "The ranking preview is an editorial navigation tool, not an official game leaderboard. Open the methodology or category-specific page before using a placement, and confirm that its criteria match the collection, progression, or comparison goal you actually have.",
  database: "The dashboard above is the current structured-data preview. Its totals come from verified Items, Coins, and Accessories records; index and methodology pages explain fields but do not add an entity or value that is absent from the published datasets.",
};

const splitDocument = (text) => {
  const match = text.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter");
  return { frontmatter: match[1], body: match[2] };
};
const sectionsFrom = (body) => body.split(/(?=^## )/m).filter((part) => part.trim()).map((part) => {
  const match = part.match(/^## ([^\r\n]+)\r?\n([\s\S]*)$/);
  return match ? { title: match[1].trim(), content: match[2].trim() } : { title: "", content: part.trim() };
});
const find = (sections, patterns) => sections.find((section) => patterns.some((pattern) => pattern.test(section.title)));
const render = (title, section, extra = "") => `## ${title}\n\n${section?.content ?? ""}${extra ? `\n\n${extra}` : ""}`.trim();

for (const category of hubCategories) {
  const file = path.join(wiki, category, "index.mdx");
  const { frontmatter, body } = splitDocument(fs.readFileSync(file, "utf8"));
  const sections = sectionsFrom(body);
  const summary = find(sections, [/^TL;DR$/i, /^Summary$/i]);
  const data = find(sections, [/^Details Table$/i, /^Data Preview$/i]);
  const main = find(sections, [/^Overview$/i, /^Main Content$/i]);
  const how = find(sections, [/^How /i]);
  const priority = find(sections, [/^Priority Topics$/i]);
  const tips = find(sections, [/^Tips$/i]);
  const faq = find(sections, [/^FAQ$/i]);
  const related = find(sections, [/^Related Pages$/i]);
  const dataExtra = data?.content.includes(additions[category]) ? "" : additions[category];
  const ordered = [
    render("Summary", summary),
    render("Data Preview", data, dataExtra),
    render("Main Content", main),
    render("How To Use This Hub", how),
    render("Priority Topics", priority),
    render("Tips", tips),
    render("FAQ", faq),
    render("Related Pages", related),
  ];
  fs.writeFileSync(file, `${frontmatter}\n${ordered.join("\n\n")}\n`);
}

const guideDir = path.join(wiki, "guides");
for (const name of fs.readdirSync(guideDir).filter((name) => name.endsWith(".mdx") && name !== "index.mdx")) {
  const file = path.join(guideDir, name);
  const { frontmatter, body: sourceBody } = splitDocument(fs.readFileSync(file, "utf8"));
  const title = frontmatter.match(/^h1:\s*["']?(.+?)["']?\r?$/m)?.[1]?.replace(/^RE:Heads, Please!\s*/i, "") ?? name.replace(/\.mdx$/, "").replaceAll("-", " ");
  let body = sourceBody;
  if (/^## TL;DR\s*$/m.test(body)) body = body.replace(/^## TL;DR\s*$/m, `## Introduction\n\nThis guide focuses on ${title} as a distinct player goal. Use the summary below to confirm that the page matches the action you want to complete before following its steps.`);
  if (/^## Guide Summary\s*$/m.test(body)) body = body.replace(/^## Guide Summary\s*$/m, "## Introduction");
  if (!/^## Steps\s*$/m.test(body)) body = body.replace(/^## How[^\r\n]*$/m, "## Steps");
  body = body.replace(/^## Practical Tips and Verification\s*$/m, "## Verification Checklist");
  body = body.replace(/^## Practical Tips\s*$/m, "## Tips");
  if (!/^## (?:Common )?Mistakes\s*$/m.test(body)) {
    const mistakes = `## Mistakes\n\nThe most common mistake with ${title} is skipping the current requirement or feedback because an older route looks familiar. Confirm the exact menu, control, resource, or progression state before the first action, then change one thing at a time so the result remains attributable to the correct step.\n\nAvoid treating a single outcome as a permanent rule. Platform controls, account state, event availability, and later updates can change what a player sees. If the guide and the live interface differ, stop before spending a limited resource, record the visible difference, and check the latest in-game information.`;
    body = /^## FAQ\s*$/m.test(body) ? body.replace(/^## FAQ\s*$/m, `${mistakes}\n\n## FAQ`) : `${body.trim()}\n\n${mistakes}\n`;
  }
  fs.writeFileSync(file, `${frontmatter}${body.trim()}\n`);
}

const reviewPatterns = [
  (topic, focus) => `Start the review of ${topic} by locating the current ${focus} label or control. Record the state before the action, use one relevant input, and read the complete response. This sequence keeps the page tied to an observable result instead of a remembered or assumed rule.`,
  (topic, focus) => `For ${topic}, treat ${focus} as a boundary for the article. Confirm the named screen, prerequisite, and outcome that belong to that boundary, then move to a related page if the next question concerns a different system or entity.`,
  (topic, focus) => `The practical test for ${topic} begins with ${focus}. Match the wording in the live game, separate the requirement from the result, and leave any hidden rate, fixed value, or permanent availability claim unresolved when the interface does not expose it.`,
  (topic, focus) => `Use ${focus} to distinguish current evidence about ${topic} from historical context. An older image may help identify a menu, but only the current prompt and resulting account state can support an immediate player decision.`,
  (topic, focus) => `A careful ${topic} check narrows ${focus} to one question at a time. Identification, acquisition, value, rarity, usefulness, and preference are different judgments; confirming one does not automatically settle the others.`,
  (topic, focus) => `When reviewing ${topic}, write down what ${focus} looks like before and after the relevant action. If the outcome changes across devices, progression states, or updates, keep those conditions attached to the observation instead of declaring a universal rule.`,
  (topic, focus) => `${topic} should remain actionable without overstating ${focus}. Use exact names, visible requirements, and reproducible feedback. If one of those elements is missing, direct the reader to the current game rather than replacing the gap with a likely-sounding answer.`,
  (topic, focus) => `The ${focus} portion of ${topic} is best read as a verification checkpoint. Stop before spending a limited resource, compare the current interface with the page’s scope, and continue only when the expected action and result are clear.`,
  (topic, focus) => `Separate discovery from evaluation on ${topic}. First use ${focus} to confirm that the correct record or system is open. Then decide whether the documented fields are sufficient for the player’s goal without importing claims from a neighboring page.`,
  (topic, focus) => `For a repeatable check of ${topic}, keep ${focus} constant while testing one change. This reduces the chance that a reward, equipment swap, menu transition, or unrelated progression event will be mistaken for the cause of the result.`,
  (topic, focus) => `Read ${topic} with the limits of ${focus} in mind. A dated Wiki observation provides review context, while the live game remains the immediate reference when labels, requirements, sources, or responses no longer match.`,
  (topic, focus) => `Use the page about ${topic} to answer the specific ${focus} question named here. Broader category browsing belongs on the hub, and a named database record should be used when the player needs fields for one exact entity.`,
];
const categoryPurpose = {
  codes: "code status and redemption evidence",
  items: "item identification, acquisition, and inventory context",
  coins: "coin sources, collection state, and comparison fields",
  accessories: "accessory rarity, unlock evidence, and collection context",
  guides: "a reproducible player process with visible checkpoints",
  database: "structured lookup fields and their verification limits",
  "tier-list": "an editorial comparison with explicit criteria",
};
for (const file of fs.readdirSync(wiki, { withFileTypes: true }).filter((entry) => entry.isDirectory()).flatMap((directory) => {
  const dir = path.join(wiki, directory.name);
  return fs.readdirSync(dir).filter((name) => name.endsWith(".mdx") && name !== "index.mdx").map((name) => ({ file: path.join(dir, name), category: directory.name, slug: name.replace(/\.mdx$/, "") }));
})) {
  const { frontmatter, body: sourceBody } = splitDocument(fs.readFileSync(file.file, "utf8"));
  if (/^## Page-Specific Review\s*$/m.test(sourceBody)) continue;
  const topic = frontmatter.match(/^h1:\s*["']?(.+?)["']?\r?$/m)?.[1]?.replace(/^RE:Heads, Please!\s*/i, "") ?? file.slug.replaceAll("-", " ");
  const keyword = frontmatter.match(/^keyword:\s*["']?(.+?)["']?\r?$/m)?.[1] ?? topic;
  const focus = file.slug.replaceAll("-", " ");
  const seed = [...file.slug].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const first = reviewPatterns[seed % reviewPatterns.length](topic, focus);
  const second = reviewPatterns[(seed * 5 + 3) % reviewPatterns.length](topic, keyword);
  const purpose = categoryPurpose[file.category] ?? "one focused Wiki question";
  const review = `## Page-Specific Review\n\n${first}\n\n${second}\n\nThe editorial purpose of this ${file.category} page is ${purpose}. That purpose determines which related link should be opened next and which facts should remain outside the scope of ${topic}.`;
  const body = /^## FAQ\s*$/m.test(sourceBody) ? sourceBody.replace(/^## FAQ\s*$/m, `${review}\n\n## FAQ`) : `${sourceBody.trim()}\n\n${review}\n`;
  fs.writeFileSync(file.file, `${frontmatter}${body.trim()}\n`);
}

console.log(`Optimized ${hubCategories.length} hubs and ${fs.readdirSync(guideDir).filter((name) => name.endsWith(".mdx") && name !== "index.mdx").length} MDX guides.`);
