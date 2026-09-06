import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const keywordPath = path.join(projectRoot, "src", "content", "wiki", "keywords.json");
const outputRoot = path.join(projectRoot, "src", "content", "wiki");
const matrix = JSON.parse(await readFile(keywordPath, "utf8"));
const publicationDate = "2026-09-05";

const categoryContext = {
  codes: {
    label: "Codes",
    singular: "code topic",
    domain: "code status, redemption, rewards, and troubleshooting",
    opening: "Codes are useful only when their spelling, availability, and reward status have been checked in the current game build.",
    acquisition: "How to Get and Use Codes",
    action: "compare the displayed code text, enter it exactly, and confirm the result inside the game",
    caution: "Never treat an unverified social post, screenshot, or copied list as proof that a code still works.",
  },
  items: {
    label: "Items",
    singular: "item topic",
    domain: "item purpose, rarity, acquisition, inventory use, and progression",
    opening: "An item is best understood through its current in-game label, description, source, and practical use rather than an unsupported value claim.",
    acquisition: "How to Get or Unlock",
    action: "inspect the relevant inventory, reward, shop, event, or progression screen before choosing a route",
    caution: "Do not assume that an older location, cost, or reward condition still applies after an update.",
  },
  accessories: {
    label: "Accessories",
    singular: "accessory topic",
    domain: "accessory acquisition, rarity, equipment, effects, and collection planning",
    opening: "Accessory information should separate appearance, practical effects, rarity labels, and acquisition requirements so players can compare like with like.",
    acquisition: "How to Get or Unlock",
    action: "check the accessory interface, available ticket or roll prompts, and the current acquisition notice",
    caution: "Random systems can change, so this wiki does not state an exact probability unless it can be verified in the current game.",
  },
  coins: {
    label: "Coins",
    singular: "coin topic",
    domain: "coin behavior, acquisition, comparison, equipment, and progression value",
    opening: "A coin should be evaluated by what the current game shows and how it supports a player's goal, not by an isolated label or unsupported ranking.",
    acquisition: "How to Get or Unlock",
    action: "review the relevant coin, fountain, roll, reward, and inventory interfaces before spending resources",
    caution: "Do not infer a guaranteed return, fixed probability, or permanent value from a small number of attempts.",
  },
  guides: {
    label: "Guides",
    singular: "gameplay guide",
    domain: "controls, early decisions, navigation, progression, and repeatable play habits",
    opening: "A useful guide explains a repeatable decision process while leaving room for interface and balance changes between updates.",
    acquisition: "How to Unlock the Relevant Feature",
    action: "follow the current tutorial and on-screen prompts, then confirm each control or feature in a low-risk situation",
    caution: "Button labels, control mappings, and unlock conditions may differ by device or game version.",
  },
  "tier-list": {
    label: "Tier List",
    singular: "ranking topic",
    domain: "ranking criteria, player goals, rarity, utility, and update-sensitive comparisons",
    opening: "A tier list is a decision aid, not an official verdict, and every placement needs a visible reason and a current evidence date.",
    acquisition: "How to Unlock and Compare Options",
    action: "identify which options are currently available to the player, then compare them against one clearly stated goal",
    caution: "A ranking can become outdated when balance, acquisition, or the player's progression stage changes.",
  },
  database: {
    label: "Database",
    singular: "database reference",
    domain: "names, categories, rarity, values, locations, acquisition notes, and update records",
    opening: "A database entry is reliable only when labels, fields, and update notes distinguish confirmed information from details that still need checking.",
    acquisition: "How to Find and Verify the Entry",
    action: "match the exact in-game name, inspect the relevant screen, and record only fields that can be observed",
    caution: "Blank or uncertain fields should remain clearly marked instead of being filled with a guess.",
  },
};

function humanize(slug) {
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function yaml(value) {
  return JSON.stringify(value);
}

function topicProfile(slug, keyword) {
  const readable = humanize(slug);
  const lower = `${slug} ${keyword}`.toLowerCase();
  if (lower.includes("working") || lower.includes("new-codes")) return { angle: "current availability and evidence quality", task: "separate confirmed results from codes that still need a fresh test", caution: "a successful result from an older session does not prove current availability" };
  if (lower.includes("expired")) return { angle: "historical status and clear labeling", task: "keep inactive entries separate from the working list while preserving useful reward context", caution: "an expired label should follow a repeatable test rather than an assumption based on age" };
  if (lower.includes("redeem") || lower.includes("enter-codes")) return { angle: "safe redemption workflow", task: "locate the current entry field, preserve capitalization, and read the returned message", caution: "the interface location and wording can change between versions" };
  if (lower.includes("not-working")) return { angle: "systematic troubleshooting", task: "check spelling, status, session freshness, and eligibility one variable at a time", caution: "repeated attempts do not fix a code that is inactive or restricted" };
  if (lower.includes("mobile")) return { angle: "touch controls and limited screen space", task: "verify the visible touch prompts and avoid covering important interface feedback", caution: "mobile layouts may vary with device size and interface updates" };
  if (lower.includes("pc") || lower.includes("controls")) return { angle: "input mapping and reliable practice", task: "confirm every key or button from the current settings and on-screen prompts", caution: "community control lists can become stale after remapping or updates" };
  if (lower.includes("xbox")) return { angle: "controller navigation and focus states", task: "verify button prompts and menu focus movement directly on the active controller layout", caution: "platform and controller mappings may not match keyboard instructions" };
  if (lower.includes("value") || lower.includes("profit") || lower.includes("price")) return { angle: "contextual value without unsupported numbers", task: "compare usefulness, availability, progression stage, and current demand as separate signals", caution: "value is not automatically identical to rarity or acquisition difficulty" };
  if (lower.includes("rarity")) return { angle: "rarity labels and their limits", task: "record the exact displayed rarity and keep it separate from usefulness or player preference", caution: "a rare label alone does not establish a market value or best-in-slot status" };
  if (lower.includes("gacha") || lower.includes("roll")) return { angle: "resource-aware random-system decisions", task: "confirm the cost, available pool, and displayed rules before committing resources", caution: "short personal results cannot establish an exact probability" };
  if (lower.includes("fountain")) return { angle: "interface-led fountain verification", task: "observe the current prompt, possible actions, and result messaging before drawing conclusions", caution: "the guide does not assume a fixed cost, reward, or chance" };
  if (lower.includes("flip")) return { angle: "repeatable coin-flip execution", task: "learn the input, feedback, and recovery flow before optimizing speed", caution: "visual timing impressions are not proof of a hidden probability" };
  if (lower.includes("beginner") || lower.includes("getting-started")) return { angle: "low-risk early progression", task: "learn the interface, preserve flexible resources, and complete visible objectives before specializing", caution: "an advanced player's shortcut may not be available or useful in a new profile" };
  if (lower.includes("inventory")) return { angle: "inventory clarity and resource control", task: "identify item names, categories, quantities, and intended uses before spending or discarding anything", caution: "similar icons or names should not be treated as interchangeable" };
  if (lower.includes("consumable") || lower.includes("boost")) return { angle: "timing temporary or single-use benefits", task: "read the current description and activate the resource only when its purpose matches the session plan", caution: "duration, stacking, and effect strength require current in-game confirmation" };
  if (lower.includes("enchant")) return { angle: "enchantment preparation and compatibility", task: "confirm the target, requirement, and previewed result before using a limited resource", caution: "compatibility and outcomes should never be inferred from the item name alone" };
  if (lower.includes("complete") || lower.includes("database") || lower.includes("index") || lower.includes("list")) return { angle: "coverage, navigation, and transparent gaps", task: "use consistent names and fields while marking entries that still need verification", caution: "complete means structurally covered, not that every field can be guaranteed forever" };
  if (lower.includes("tier") || lower.includes("best")) return { angle: "goal-based ranking with visible criteria", task: "state the goal first, compare evidence consistently, and explain why each option belongs in its group", caution: "there is no universal best choice for every progression stage and play style" };
  if (lower.includes("location")) return { angle: "location discovery and route confirmation", task: "verify the place name, nearby landmark, prerequisite, and current access path", caution: "map layouts and travel requirements may change" };
  if (lower.includes("acquisition") || lower.includes("how-to-get")) return { angle: "source-by-source acquisition verification", task: "separate guaranteed steps, conditional rewards, events, and random sources", caution: "an old source should not be presented as active without a current check" };
  return { angle: `${readable.toLowerCase()} explained through observable evidence`, task: "start with the current interface, note what is directly shown, and separate observation from interpretation", caution: "details that cannot be confirmed should remain explicitly uncertain" };
}

function makeFaq(pageTitle, profile, context) {
  return [
    {
      question: `What is the main purpose of this ${pageTitle} guide?`,
      answer: `It provides a verification-first way to understand ${profile.angle}. It focuses on decisions a player can check in the current game instead of claiming an exact value, probability, or permanent rule that has not been confirmed.`,
    },
    {
      question: `How should I verify information about ${pageTitle}?`,
      answer: `Open the current game, compare the exact labels and prompts with this page, and confirm the result after the relevant action. If the interface does not show enough evidence, Check the latest in-game information.`,
    },
    {
      question: `Can ${pageTitle} information change?`,
      answer: `Yes. Availability, wording, requirements, balance, and interface placement can change after an update. Use the updated date as a review signal, then confirm anything that affects an important resource or progression decision.`,
    },
    {
      question: `What should I do when a detail is missing?`,
      answer: `Treat the missing detail as unknown rather than filling it with a guess. ${context.caution} Check the latest in-game information before acting on a claim that the wiki has not verified.`,
    },
  ];
}

function frontmatter({ page, category, faq, related, isHub }) {
  const context = categoryContext[category.slug];
  const tags = [category.slug, "wiki", isHub ? "hub" : "priority-1", page.intent ?? "informational"];
  const lines = [
    "---",
    `title: ${yaml(page.title)}`,
    `h1: ${yaml(page.h1)}`,
    `description: ${yaml(page.description)}`,
    `keyword: ${yaml(page.keyword)}`,
    "keywords:",
    ...([page.keyword, ...(page.variants ?? [])].map((value) => `  - ${yaml(value)}`)),
    `slug: ${yaml(page.slug)}`,
    `category: ${yaml(category.slug)}`,
    "tags:",
    ...(tags.map((value) => `  - ${yaml(value)}`)),
    "cover: \"\"",
    `coverAlt: ${yaml(`${page.h1} cover placeholder`)}`,
    `publishedAt: ${yaml(publicationDate)}`,
    `updatedAt: ${yaml(publicationDate)}`,
    "infobox:",
    `  Page type: ${yaml(isHub ? "Category hub" : "Priority 1 guide")}`,
    `  Topic: ${yaml(context.domain)}`,
    `  Verification: ${yaml("Check the latest in-game information")}`,
    `  Content status: ${yaml("Original wiki guidance")}`,
    "faq:",
    ...faq.flatMap((item) => [
      `  - question: ${yaml(item.question)}`,
      `    answer: ${yaml(item.answer)}`,
    ]),
    "related:",
    ...related.map((value) => `  - ${yaml(value)}`),
    "---",
  ];
  return lines.join("\n");
}

function articleBody(page, category, related) {
  const context = categoryContext[category.slug];
  const profile = topicProfile(page.slug, page.keyword);
  const topic = page.h1.replace("RE:Heads, Please! ", "");
  const faq = makeFaq(topic, profile, context);
  const outlineLens = page.outline.join(", ").toLowerCase();

  const body = `## TL;DR

- Use this page to understand ${profile.angle}; it does not invent hidden rates, fixed values, or official guarantees.
- Before spending a limited resource, ${profile.task}.
- If a field, requirement, or result cannot be confirmed, Check the latest in-game information.

## Overview

${topic} is a focused reference for players who want to make a clear decision without relying on copied lists or unsupported claims. ${context.opening} The practical question is not simply whether a name appears on a page. It is whether the information matches the current game, explains what the player can observe, and identifies what remains uncertain. This article therefore treats ${profile.angle} as its main lens.

The page is organized around ${outlineLens}. Those headings form an editorial checklist rather than a promise that every field is permanently settled. A useful record distinguishes the in-game label from interpretation, the acquisition route from the result, and a temporary observation from a stable rule. That distinction matters because an update can change wording, availability, costs, requirements, or balance without changing the general name of the feature.

For a quick review, begin with the exact term shown in the game. Then note where it appears, what action revealed it, and what feedback followed. If two players report different outcomes, compare their device, session version, progression stage, and visible prerequisites before deciding that either report is wrong. The safest conclusion may be that the condition needs another current check. Check the latest in-game information whenever the evidence is incomplete.

## ${context.acquisition}

Start from a current game session and ${context.action}. Read every visible prompt before confirming an action. If the topic involves a menu, open it through the normal game flow rather than relying on an old screenshot. If it involves a reward or unlock, note the prerequisite shown immediately before the result. This creates a short evidence trail that can be repeated by another player.

Next, isolate one question at a time. Confirm the exact name first, then the source or requirement, then the result. Do not combine several changes in one test if you need to know which action mattered. For example, changing equipment, claiming a reward, and moving to another area at once can make the outcome difficult to interpret. A controlled check is slower, but it produces information that remains useful to the wiki.

Finally, verify that the expected change actually appeared. Look for a clear inventory entry, status message, equipped state, unlocked option, or other direct feedback. A missing result does not prove a bug; eligibility, spelling, session state, or an updated requirement may explain it. ${profile.caution}. When the game does not expose enough detail, Check the latest in-game information.

## Details Table

| Detail | What to check | Why it matters |
| --- | --- | --- |
| Exact name | Match capitalization and wording in the current interface. | Similar names can refer to different records or actions. |
| Current status | Look for an active, available, equipped, locked, or unavailable state. | Status determines whether older instructions still apply. |
| Requirement | Record only prerequisites that the game currently displays or demonstrates. | This prevents guesses from becoming false requirements. |
| Source | Identify the visible menu, reward, location, event, or progression step. | A reproducible source is more useful than a vague claim. |
| Result | Confirm what changed after the action. | Direct feedback separates a completed step from an assumption. |
| Review note | Recheck the page after meaningful game updates. | Time-sensitive guidance needs a clear verification habit. |

## How to Evaluate the Information

Use three evidence levels. “Observed” means the detail is visible in the current game. “Repeatable” means the same steps produce consistent feedback under the same visible conditions. “Unconfirmed” means a claim is plausible but the game does not currently provide enough evidence. Keeping these levels separate makes the page helpful even when a hidden mechanic, changing event, or incomplete dataset prevents a final answer.

This approach is especially important for ${context.domain}. A player may care about collection completion, short-term progression, resource efficiency, appearance, convenience, or experimentation. Those goals can lead to different choices without either choice being incorrect. Before following a recommendation, identify the goal it serves. Then compare alternatives using the same criteria and the same version of the game.

The updated date is a prompt to review, not a guarantee that nothing changed afterward. If the page and the live interface disagree, the live interface should guide the immediate action. Note the discrepancy, avoid spending scarce resources while uncertain, and return after the information can be checked. ${context.caution}.

## Tips

1. Read the full in-game description before acting; names alone rarely explain every condition.
2. Keep a small reserve of limited resources while testing an unfamiliar system or route.
3. Change one variable at a time so the result can be linked to a specific action.
4. Capture the exact wording for your own notes, but do not treat a screenshot as permanent proof.
5. Compare options against one goal instead of mixing collection, speed, rarity, and personal preference.
6. Recheck availability after an update or when the interface no longer matches the guide.
7. Treat missing fields as unknown, and avoid repeating an estimate as if it were official data.
8. Use the related category pages to confirm terminology before making a larger progression decision.

## Related Pages

${related.map((href) => `- [${humanize(href.split("/").filter(Boolean).at(-1) ?? category.slug)}](${href})`).join("\n")}

## FAQ

${faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}
`;

  return { body, faq };
}

function hubBody(page, category, related) {
  const context = categoryContext[category.slug];
  const profile = { angle: `the ${context.label.toLowerCase()} section as a reliable starting point` };
  const faq = makeFaq(`${context.label} Hub`, profile, context);
  const priorityPages = category.l3.filter((entry) => entry.priority === 1);

  const body = `## TL;DR

- Start here to choose the right ${context.label.toLowerCase()} page for the question you are trying to answer.
- Priority pages cover the broadest, most useful topics first while keeping uncertain details clearly labeled.
- If a live screen differs from the wiki, Check the latest in-game information.

## Overview

The ${context.label} hub organizes ${context.domain} into pages with one primary search intent each. It is designed for readers who may know the result they want but not the exact wiki term. Instead of combining every question into one oversized article, the hub points to a focused guide, reference, comparison, or troubleshooting page. That structure also makes updates safer because a changed mechanic can be reviewed without rewriting unrelated material.

${context.opening} For that reason, this hub does not promise that every field is permanent. It explains how the section is arranged, what kind of evidence belongs in each page, and where a reader should go next. Pages with a higher editorial priority address common starting questions. More specific pages remain connected through category links so the section can grow without producing isolated content.

## ${context.acquisition}

Choose a page by identifying the decision in front of you. If you need a broad orientation, begin with a complete list or getting-started guide. If you are comparing options, use a value, rarity, or tier page that states its criteria. If an action failed, use the matching troubleshooting or controls article. This prevents a general overview from being mistaken for a precise answer to a different question.

Once inside an article, ${context.action}. The page should tell you which details are directly observable and which require a current check. Do not skip warnings simply because the title appears to match your question. ${context.caution} Check the latest in-game information before committing a limited resource or repeating a claim as confirmed.

## Details Table

| Page type | Best used for | Verification expectation |
| --- | --- | --- |
| Complete list | Discovering names and coverage gaps | Match entries with current in-game labels. |
| How-to guide | Following a visible sequence of actions | Confirm prompts, prerequisites, and result feedback. |
| Value or rarity reference | Comparing separate attributes | Do not substitute one attribute for another. |
| Troubleshooting page | Isolating why an action failed | Test one possible cause at a time. |
| Tier or comparison page | Choosing for a stated goal | Read the criteria and update date before using a rank. |
| Database index | Finding structured fields quickly | Treat blank fields as unknown rather than estimated. |

## Priority Topics

${priorityPages.map((entry) => `- [${entry.h1}](/${category.slug}/${entry.slug}) — ${entry.description}`).join("\n")}

These priority links are the first editorial batch, not a claim that lower-priority topics are unimportant. They provide the foundation needed to define names, explain common actions, and establish consistent verification language. Later articles can link back to this foundation instead of repeating assumptions.

## Tips

1. Start with the page whose title most closely matches your immediate question.
2. Check the article's updated date before relying on update-sensitive instructions.
3. Keep value, rarity, usefulness, availability, and personal preference as separate ideas.
4. Follow category links when a term needs more context than one page can provide.
5. Revisit the live interface whenever the wiki uses an uncertainty notice.
6. Report or record the exact wording of discrepancies rather than paraphrasing from memory.
7. Avoid using a tier page as proof of an official ranking; rankings are editorial tools.
8. Preserve scarce resources until requirements and expected results are visible.

## Related Pages

${related.map((href) => `- [${humanize(href.split("/").filter(Boolean).at(-1) ?? "Home")}](${href})`).join("\n")}

## FAQ

${faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}
`;

  return { body, faq };
}

function countWords(value) {
  return value
    .replace(/[`#|>*_[\]()/-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

const generated = [];
for (const category of matrix.l2) {
  const categoryDir = path.join(outputRoot, category.slug);
  await mkdir(categoryDir, { recursive: true });
  const categoryPages = category.l3.filter((page) => page.priority === 1);

  const hubRelated = matrix.l2
    .filter((entry) => entry.slug !== category.slug)
    .slice(0, 5)
    .map((entry) => `/${entry.slug}`);
  const hubPage = {
    ...category,
    slug: "index",
    variants: [],
    intent: "navigational",
  };
  const hubContent = hubBody(hubPage, category, hubRelated);
  const hubDocument = `${frontmatter({ page: hubPage, category, faq: hubContent.faq, related: hubRelated, isHub: true })}\n\n${hubContent.body}`;
  const hubWords = countWords(hubContent.body);
  if (hubWords < 400) throw new Error(`${category.slug}/index.mdx is below 400 words (${hubWords}).`);
  await writeFile(path.join(categoryDir, "index.mdx"), hubDocument, "utf8");
  generated.push({ route: `/${category.slug}`, file: `${category.slug}/index.mdx`, words: hubWords, priority: "hub" });

  for (const page of categoryPages) {
    const siblings = category.l3.filter((entry) => entry.slug !== page.slug).slice(0, 4);
    const related = [
      `/${category.slug}`,
      ...siblings.map((entry) => `/${category.slug}/${entry.slug}`),
    ];
    const content = articleBody(page, category, related);
    const document = `${frontmatter({ page, category, faq: content.faq, related, isHub: false })}\n\n${content.body}`;
    const words = countWords(content.body);
    if (words < 800 || words > 1500) throw new Error(`${category.slug}/${page.slug}.mdx has ${words} words; expected 800-1500.`);
    if (/https?:\/\//i.test(document)) throw new Error(`${category.slug}/${page.slug}.mdx contains an external URL.`);
    for (const heading of ["## TL;DR", "## Overview", "## Details Table", "## Tips", "## Related Pages", "## FAQ"]) {
      if (!document.includes(heading)) throw new Error(`${category.slug}/${page.slug}.mdx is missing ${heading}.`);
    }
    await writeFile(path.join(categoryDir, `${page.slug}.mdx`), document, "utf8");
    generated.push({ route: `/${category.slug}/${page.slug}`, file: `${category.slug}/${page.slug}.mdx`, words, priority: 1 });
  }
}

const detailCount = generated.filter((entry) => entry.priority === 1).length;
const hubCount = generated.filter((entry) => entry.priority === "hub").length;
const detailWords = generated.filter((entry) => entry.priority === 1).map((entry) => entry.words);
console.log(JSON.stringify({
  generated: generated.length,
  priority1: detailCount,
  hubs: hubCount,
  minDetailWords: Math.min(...detailWords),
  maxDetailWords: Math.max(...detailWords),
  files: generated,
}, null, 2));
