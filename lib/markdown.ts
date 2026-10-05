import { readFileSync } from "node:fs";
import { join } from "node:path";
import { AI_SYSTEMS, EXPERIENCE, SKILLS, VENTURES, type Venture } from "./content";
import { CHAPTERS, HOW_I_WORK } from "./about";
import { CV_EXTRAS, CV_PROFILE, STRENGTHS } from "./cv";
import { FAQ } from "./faq";
import { llmsTxt } from "./llms";
import { PRIVACY, PRIVACY_UPDATED } from "./privacy";
import { PERSON, SITE_URL } from "./site";

/**
 * Markdown versions of every page, served when a client asks for
 * `Accept: text/markdown` (see proxy.ts) or adds `.md` to a URL.
 */

const footer = (path: string) =>
  [
    "",
    "---",
    "",
    `HTML version: ${SITE_URL}${path === "/" ? "" : path}`,
    `Site summary for AI assistants: ${SITE_URL}/llms.txt · Everything in one file: ${SITE_URL}/llms-full.txt`,
    `Contact: email from the contact section of ${SITE_URL}/#contact, or LinkedIn ${PERSON.links.linkedin}`,
  ].join("\n");

export function caseStudyMarkdown(v: Venture, level = 1) {
  const h = (n: number) => "#".repeat(level + n - 1);
  const out = [`${h(1)} ${v.name}`, "", `> ${v.tagline}`, ""];
  out.push(
    `- **What it is:** ${v.kind}`,
    `- **James's role:** ${v.role}`,
    `- **When:** ${v.period}`,
    `- **Where:** ${v.place}`,
  );
  if (v.url) out.push(`- **Live:** ${v.url}`);
  out.push("", `${h(2)} Why it exists`, "", v.summary, "", v.problem, "");
  out.push(`${h(2)} ${v.builtHeading ?? "What I built"}`, "");
  v.built.forEach((b) => out.push(`- **${b.title}.** ${b.body}`));
  out.push("");
  if (v.ai?.length) {
    out.push(`${h(2)} How AI is used`, "");
    v.ai.forEach((a) => out.push(`- **${a.title}.** ${a.body}`));
    out.push("");
  }
  out.push(`${h(2)} Key numbers`, "");
  v.metrics.forEach((m) => out.push(`- **${m.value}** ${m.label}`));
  out.push("", `${h(2)} Stack`, "", v.stack.join(", "), "");
  if (v.credit) out.push(v.credit, "");
  return out.join("\n");
}

function home() {
  return [
    llmsTxt(),
    "## Applied AI",
    "",
    ...AI_SYSTEMS.map((a) => `- **${a.name}** (${a.where}): ${a.body}`),
    "",
    "## Experience",
    "",
    ...EXPERIENCE.map((e) => `- **${e.role}**, ${e.org}, ${e.place} (${e.period}). ${e.note}`),
  ].join("\n");
}

function about() {
  return [
    `# About ${PERSON.name}`,
    "",
    "I'm James Ofori Ayerakwa. I build web, mobile and AI products from start to finish. The parts I care about most are the ones people rarely notice, like permissions, privacy, support for a second language and apps that still work on a slow network, because that is where people decide whether to trust a product.",
    "",
    ...CHAPTERS.flatMap((c) => [`## ${c.year}: ${c.title}`, "", c.body, ""]),
    ...HOW_I_WORK.flatMap((x) => [`## ${x.k}`, "", x.v, ""]),
    "## Questions people ask me",
    "",
    ...FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ].join("\n");
}

function now() {
  const mdx = readFileSync(join(process.cwd(), "app/now/content.mdx"), "utf8");
  return [`# What ${PERSON.shortName} is working on now`, "", mdx.trim()].join("\n");
}

function cv() {
  return [
    `# ${PERSON.name} — CV`,
    "",
    `${PERSON.role} · ${PERSON.location}`,
    "",
    "## Profile",
    "",
    CV_PROFILE,
    "",
    "## Core strengths",
    "",
    ...STRENGTHS.map(([k, v]) => `- **${k}.** ${v}`),
    "",
    "## Experience",
    "",
    ...EXPERIENCE.map((e) => `- **${e.role}**, ${e.org}, ${e.place} (${e.period}). ${e.note}`),
    "",
    "## Skills",
    "",
    ...SKILLS.map((g) => `- **${g.group}:** ${g.items.join(", ")}`),
    "",
    "## Education and other",
    "",
    ...CV_EXTRAS.map((x) => `- ${x}`),
  ].join("\n");
}

function privacy() {
  return [
    "# Privacy",
    "",
    `Updated ${PRIVACY_UPDATED}.`,
    "",
    ...PRIVACY.flatMap((s) => [`## ${s.title}`, "", ...s.body.flatMap((p) => [p, ""])]),
  ].join("\n");
}

const PAGES: Record<string, () => string> = {
  "/": home,
  "/about": about,
  "/now": now,
  "/cv": cv,
  "/privacy": privacy,
  ...Object.fromEntries(VENTURES.map((v) => [`/work/${v.slug}`, () => caseStudyMarkdown(v)])),
};

export const MARKDOWN_PATHS = Object.keys(PAGES);

/** The Markdown for a path, or null when there is no such page. */
export function pageMarkdown(path: string): string | null {
  const page = PAGES[path];
  return page ? page() + footer(path) : null;
}

export function notFoundMarkdown(path: string) {
  return [
    "# Page not found (404)",
    "",
    `There is no page at \`${path}\` on ${SITE_URL}. It may have moved, or the link may be wrong.`,
    "",
    "These pages exist:",
    "",
    ...MARKDOWN_PATHS.map((p) => `- ${SITE_URL}${p === "/" ? "" : p}`),
    "",
    `A summary of the whole site for AI assistants is at ${SITE_URL}/llms.txt, and the sitemap is at ${SITE_URL}/sitemap.xml.`,
  ].join("\n");
}
