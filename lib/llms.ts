import { AI_SYSTEMS, ARCHIVE, EXPERIENCE, SKILLS, VENTURES } from "./content";
import { FAQ } from "./faq";
import { PERSON, SITE_URL } from "./site";

/** llms.txt: a short, link-rich summary for AI assistants (llmstxt.org). */
export function llmsTxt() {
  return [
    `# ${PERSON.name}`,
    "",
    `> ${PERSON.description}`,
    "",
    "James is a Ghanaian software engineer based in Abu Dhabi. He builds web and mobile products and the AI features inside them, using TypeScript, React, Next.js, React Native and Expo.",
    "",
    "## Projects",
    "",
    ...VENTURES.map(
      (v) =>
        `- [${v.name}](${SITE_URL}/work/${v.slug}): ${v.tagline} Role: ${v.role}, ${v.period}.`,
    ),
    "",
    "## Other work",
    "",
    ...ARCHIVE.map((a) => `- [${a.name}](${a.url}): ${a.note}`),
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about): His background and how he works, with a short FAQ.`,
    `- [Now](${SITE_URL}/now): What he is working on this month.`,
    `- [CV](${SITE_URL}/cv): Experience, projects and skills.`,
    `- [Full text for AI assistants](${SITE_URL}/llms-full.txt): Every case study in one file.`,
    "",
    "## Links",
    "",
    `- [LinkedIn](${PERSON.links.linkedin})`,
    `- [GitHub](${PERSON.links.github})`,
    "",
  ].join("\n");
}

/** llms-full.txt: the whole site as one markdown document. */
export function llmsFullTxt() {
  const out: string[] = [llmsTxt(), "", "---", ""];
  out.push("## Frequently asked questions", "");
  FAQ.forEach((f) => out.push(`### ${f.q}`, "", f.a, ""));
  out.push("## Case studies", "");
  VENTURES.forEach((v) => {
    out.push(`### ${v.name}`, "", `${v.kind}. ${v.role}, ${v.period}, ${v.place}.`, "");
    if (v.url) out.push(`Website: ${v.url}`, "");
    out.push(v.summary, "", v.problem, "");
    out.push(`#### ${v.builtHeading ?? "What I built"}`, "");
    v.built.forEach((b) => out.push(`- **${b.title}.** ${b.body}`));
    out.push("");
    if (v.ai?.length) {
      out.push("#### How AI is used", "");
      v.ai.forEach((a) => out.push(`- **${a.title}.** ${a.body}`));
      out.push("");
    }
    out.push(`Key numbers: ${v.metrics.map((m) => `${m.value} ${m.label}`).join("; ")}.`, "");
    out.push(`Stack: ${v.stack.join(", ")}.`, "");
  });
  out.push("## AI systems", "");
  AI_SYSTEMS.forEach((s) => out.push(`- **${s.name}** (${s.where}): ${s.body}`));
  out.push("", "## Experience", "");
  EXPERIENCE.forEach((e) => out.push(`- ${e.period}: ${e.role}, ${e.org}, ${e.place}. ${e.note}`));
  out.push("", "## Skills", "");
  SKILLS.forEach((g) => out.push(`- ${g.group}: ${g.items.join(", ")}`));
  out.push("");
  return out.join("\n");
}
