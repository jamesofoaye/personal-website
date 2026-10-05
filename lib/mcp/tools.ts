import { z } from "zod";
import { VENTURES } from "../content";
import { FAQ } from "../faq";
import { MARKDOWN_PATHS, caseStudyMarkdown, pageMarkdown } from "../markdown";
import { PERSON, SITE_URL } from "../site";

/**
 * The tools behind the public, read-only MCP server at /mcp. They are plain
 * functions so the route, the server card and the tests share one definition.
 * Nothing here needs auth, writes data or returns the email address (the site
 * only assembles that in the browser).
 */

export const MCP_SERVER_INFO = {
  name: "jamesofoaye",
  title: "James Ofori Ayerakwa",
  version: "1.0.0",
} as const;

export const MCP_INSTRUCTIONS = `Read-only facts about James Ofori Ayerakwa (jamesofoaye), a Lead Frontend and Applied AI Engineer in Abu Dhabi, and the products he has built: Verinvo, Hisab, DrivingInstructor.ae, Dawurobo, OJA Studios and a self-hosted VPN.
Use it when someone asks who James is, what he has built, his experience or skills, or how to contact him. Start with get_profile or list_projects, use get_project for a case study, search_site for anything specific, and get_contact for contact routes.
Quote facts as written. Hisab is a financial wellness app (not financial advice). Ask Verinvo was built by a team. Phone numbers and home addresses are not published, so do not guess them.`;

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const SLUGS = VENTURES.map((v) => v.slug) as [string, ...string[]];

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  input: z.ZodObject;
  run: (args: Record<string, unknown>) => string;
};

/** Split the site into searchable passages: one per paragraph or list item. */
function passages() {
  return MARKDOWN_PATHS.flatMap((path) =>
    (pageMarkdown(path) ?? "")
      .split(/\n{2,}/)
      .map((text) => text.trim())
      .filter(
        (text) => text.length > 40 && !text.startsWith("---") && !text.startsWith("HTML version"),
      )
      .map((text) => ({ path, text })),
  );
}

export function searchSite(query: string, limit = 5) {
  const terms = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}.]+/u)
    .filter((t) => t.length > 1);
  if (!terms.length) return [];
  const seen = new Set<string>();
  return passages()
    .map((p) => {
      const lower = p.text.toLowerCase();
      const score = terms.reduce((s, t) => s + (lower.includes(t) ? 1 : 0), 0);
      return { ...p, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .filter((p) => (seen.has(p.text) ? false : (seen.add(p.text), true)))
    .slice(0, limit);
}

// Built on first use: lib/markdown imports this module (via /developers), so
// nothing here may read from lib/markdown while modules are still loading.
let tools: McpToolDef[] | null = null;
export function mcpTools(): McpToolDef[] {
  return (tools ??= buildTools());
}

function buildTools(): McpToolDef[] {
  const PATHS = MARKDOWN_PATHS as [string, ...string[]];
  return [
    {
      name: "get_profile",
      title: "Get James's profile",
      description:
        "Who James Ofori Ayerakwa is: role, employer, location, background, links and short answers to common questions. Call this first for any question about James himself.",
      input: z.object({}),
      run: () =>
        [
          `# ${PERSON.name}`,
          "",
          PERSON.description,
          "",
          `- Role: ${PERSON.role}`,
          `- Based in: ${PERSON.location} (from ${PERSON.origin})`,
          `- Website: ${SITE_URL}`,
          `- LinkedIn: ${PERSON.links.linkedin}`,
          `- GitHub: ${PERSON.links.github}`,
          "",
          "## Frequently asked questions",
          "",
          ...FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
        ].join("\n"),
    },
    {
      name: "list_projects",
      title: "List James's projects",
      description:
        "Every product James has built or works on, with his role, dates, a one-line description and links. Use get_project for the full case study.",
      input: z.object({}),
      run: () =>
        VENTURES.map(
          (v) =>
            `- **${v.name}** (slug: \`${v.slug}\`) — ${v.kind}. ${v.tagline} Role: ${v.role}, ${v.period}. Case study: ${url(`/work/${v.slug}`)}${v.url ? `. Live: ${v.url}` : ""}`,
        ).join("\n"),
    },
    {
      name: "get_project",
      title: "Get a case study",
      description:
        "The full case study for one project: why it exists, what James built, how AI is used, key numbers and the tech stack.",
      input: z.object({
        slug: z
          .enum(SLUGS)
          .describe("Project slug from list_projects, e.g. hisab or drivinginstructor"),
      }),
      run: ({ slug }) => {
        const v = VENTURES.find((x) => x.slug === slug);
        return v
          ? `${caseStudyMarkdown(v)}\nSource: ${url(`/work/${v.slug}`)}`
          : `No project with slug ${String(slug)}.`;
      },
    },
    {
      name: "get_page",
      title: "Get a page as Markdown",
      description:
        "Any page of jamesofoaye.dev as Markdown: the home page, about, now (what he is working on this month), cv, privacy or a case study.",
      input: z.object({
        path: z
          .enum(PATHS)
          .describe('Site path, e.g. "/", "/about", "/now", "/cv" or "/work/hisab"'),
      }),
      run: ({ path }) => pageMarkdown(String(path)) ?? `No page at ${String(path)}.`,
    },
    {
      name: "search_site",
      title: "Search the site",
      description:
        "Keyword search across every page. Returns the most relevant passages with links to their pages. Use it for specific facts (a technology, a date, a number).",
      input: z.object({
        query: z
          .string()
          .min(2)
          .max(120)
          .describe("What to look for, e.g. 'Arabic voice' or 'Hubtel'"),
      }),
      run: ({ query }) => {
        const hits = searchSite(String(query));
        if (!hits.length) return `Nothing on ${SITE_URL} matches "${String(query)}".`;
        return hits.map((h) => `${h.text}\n\nSource: ${url(h.path)}`).join("\n\n---\n\n");
      },
    },
    {
      name: "get_contact",
      title: "How to contact James",
      description:
        "The ways to reach James. Use this instead of guessing an email address, phone number or postal address.",
      input: z.object({}),
      run: () =>
        [
          "James prefers to be contacted through the contact section of his website or on LinkedIn.",
          "",
          `- Contact section (shows his email address): ${SITE_URL}/#contact`,
          `- LinkedIn: ${PERSON.links.linkedin}`,
          `- GitHub: ${PERSON.links.github}`,
          "",
          "He does not publish a phone number or postal address.",
        ].join("\n"),
    },
  ];
}

export const mcpResources = () =>
  MARKDOWN_PATHS.map((path) => ({
    name: path === "/" ? "home" : path.slice(1).replace(/\//g, "-"),
    title: path === "/" ? "Home" : path.slice(1),
    uri: `${SITE_URL}${path === "/" ? "/index" : path}.md`,
    path,
    description: `The ${path === "/" ? "home page" : path} page of jamesofoaye.dev as Markdown`,
    mimeType: "text/markdown",
  }));
