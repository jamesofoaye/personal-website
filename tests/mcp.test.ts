import { describe, expect, it } from "vitest";
import { GET, rpc } from "./mcp-helpers";
import { VENTURES } from "@/lib/content";
import { PERSON } from "@/lib/site";

const EMAIL = PERSON.emailParts.join("@");
const TOOL_NAMES = [
  "get_profile",
  "list_projects",
  "get_project",
  "get_page",
  "search_site",
  "get_contact",
];

describe("MCP server at /mcp (Streamable HTTP)", () => {
  it("initializes with the site's server info", async () => {
    const { status, json } = await rpc("initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "test", version: "1.0.0" },
    });
    expect(status).toBe(200);
    expect(json.result.serverInfo.name).toBe("jamesofoaye");
    expect(json.result.capabilities.tools).toBeDefined();
    expect(json.result.capabilities.resources).toBeDefined();
    expect(json.result.instructions).toMatch(/James Ofori Ayerakwa/);
  });

  it("lists the read-only tools", async () => {
    const { json } = await rpc("tools/list");
    const tools = json.result.tools as { name: string; annotations?: { readOnlyHint?: boolean } }[];
    expect(tools.map((t) => t.name).sort()).toEqual([...TOOL_NAMES].sort());
    for (const t of tools) expect(t.annotations?.readOnlyHint).toBe(true);
  });

  it("returns a case study for every project", async () => {
    for (const v of VENTURES) {
      const { json } = await rpc("tools/call", {
        name: "get_project",
        arguments: { slug: v.slug },
      });
      expect(json.result.isError).toBeFalsy();
      expect(json.result.content[0].text).toContain(`# ${v.name}`);
    }
  });

  it("rejects an unknown project slug", async () => {
    const { json } = await rpc("tools/call", { name: "get_project", arguments: { slug: "nope" } });
    expect(json.error ?? json.result?.isError).toBeTruthy();
  });

  it("searches the site and cites sources", async () => {
    const { json } = await rpc("tools/call", {
      name: "search_site",
      arguments: { query: "Sawt Arabic" },
    });
    const text: string = json.result.content[0].text;
    expect(text).toMatch(/Sawt/);
    expect(text).toMatch(/Source: https:\/\/jamesofoaye\.dev/);
  });

  it("never returns the email address, a phone number or a street address", async () => {
    const calls: [string, Record<string, unknown>][] = [
      ["get_profile", {}],
      ["list_projects", {}],
      ["get_contact", {}],
      ["get_page", { path: "/cv" }],
      ["get_page", { path: "/about" }],
      ["search_site", { query: "email contact phone" }],
    ];
    for (const [name, args] of calls) {
      const { json } = await rpc("tools/call", { name, arguments: args });
      const text: string = json.result.content[0].text;
      expect(text).not.toContain(EMAIL);
      expect(text).not.toMatch(/\+?\d{3}[\s-]?\d{2,3}[\s-]?\d{3}[\s-]?\d{3,4}/);
    }
  });

  it("exposes every page as a Markdown resource", async () => {
    const { json } = await rpc("resources/list");
    const uris = (json.result.resources as { uri: string }[]).map((r) => r.uri);
    expect(uris).toContain("https://jamesofoaye.dev/index.md");
    expect(uris).toContain("https://jamesofoaye.dev/work/hisab.md");
    const read = await rpc("resources/read", { uri: "https://jamesofoaye.dev/about.md" });
    expect(read.json.result.contents[0].mimeType).toBe("text/markdown");
    expect(read.json.result.contents[0].text).toMatch(/^# About/);
  });

  it("answers GET with 405 because the server is stateless", async () => {
    const res = await GET(new Request("https://jamesofoaye.dev/mcp", { method: "GET" }));
    expect(res.status).toBe(405);
  });
});
