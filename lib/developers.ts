import { SITE_URL } from "./site";
import { mcpTools } from "./mcp/tools";

/** Copy for /developers, shared by the page and its Markdown version. */
export const MCP_URL = `${SITE_URL}/mcp`;

export const DEV_INTRO =
  "jamesofoaye.dev is built to be read by AI agents as well as people. Everything on the site is available through a public MCP server and as plain Markdown, with no API key or sign-up.";

export const CLIENT_SETUP: { client: string; how: string; code: string }[] = [
  {
    client: "Claude Code",
    how: "Run this in your terminal:",
    code: `claude mcp add --transport http jamesofoaye ${MCP_URL}`,
  },
  {
    client: "Claude, ChatGPT and other apps with connectors",
    how: "Add a custom connector and paste this URL:",
    code: MCP_URL,
  },
  {
    client: "Cursor, VS Code and other JSON configs",
    how: "Add this to your MCP settings:",
    code: JSON.stringify({ mcpServers: { jamesofoaye: { url: MCP_URL } } }, null, 2),
  },
];

export const MACHINE_FILES: { name: string; url: string; what: string }[] = [
  { name: "MCP server", url: MCP_URL, what: "Streamable HTTP, read-only, no auth." },
  {
    name: "MCP server card",
    url: `${SITE_URL}/.well-known/mcp/server-card.json`,
    what: "Describes the server, its tools and resources before you connect (SEP-1649). Also at /.well-known/mcp.json.",
  },
  {
    name: "llms.txt",
    url: `${SITE_URL}/llms.txt`,
    what: "A short summary of the site with guidance for agents.",
  },
  {
    name: "llms-full.txt",
    url: `${SITE_URL}/llms-full.txt`,
    what: "Every case study and the FAQ in one file.",
  },
  {
    name: "Markdown pages",
    url: `${SITE_URL}/index.md`,
    what: "Every page as Markdown. Send Accept: text/markdown, or add .md to any page URL.",
  },
  { name: "Sitemap", url: `${SITE_URL}/sitemap.xml`, what: "Every page and its screenshots." },
];

export const toolList = () => mcpTools().map((t) => ({ name: t.name, description: t.description }));
