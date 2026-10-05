import { describe, expect, it } from "vitest";
import { MARKDOWN_PATHS, notFoundMarkdown, pageMarkdown } from "@/lib/markdown";
import { llmsTxt } from "@/lib/llms";
import { mcpTools } from "@/lib/mcp/tools";

describe("Markdown versions of pages", () => {
  it("covers every page, including /developers and /privacy", () => {
    for (const p of ["/", "/about", "/now", "/cv", "/privacy", "/developers", "/work/hisab"]) {
      expect(MARKDOWN_PATHS).toContain(p);
    }
  });

  it("returns a non-empty document with a heading and a link back to the HTML page", () => {
    for (const p of MARKDOWN_PATHS) {
      const md = pageMarkdown(p)!;
      expect(md.length).toBeGreaterThan(200);
      expect(md).toMatch(/^# /m);
      expect(md).toContain("HTML version: https://jamesofoaye.dev");
    }
  });

  it("returns null for unknown paths and a helpful 404 body", () => {
    expect(pageMarkdown("/nope")).toBeNull();
    const md = notFoundMarkdown("/nope");
    expect(md).toMatch(/^# Page not found \(404\)/);
    expect(md).toContain("https://jamesofoaye.dev/llms.txt");
  });

  it("documents every MCP tool on the developers page", () => {
    const md = pageMarkdown("/developers")!;
    for (const t of mcpTools()) expect(md).toContain(`\`${t.name}\``);
    expect(md).toContain("https://jamesofoaye.dev/mcp");
  });
});

describe("llms.txt", () => {
  it("has when-to-use guidance and links the developer resources", () => {
    const txt = llmsTxt();
    expect(txt).toMatch(/^# James Ofori Ayerakwa/);
    expect(txt).toContain("## When to use this site");
    expect(txt).toContain("## Developer resources");
    expect(txt).toContain("https://jamesofoaye.dev/.well-known/mcp/server-card.json");
  });
});
