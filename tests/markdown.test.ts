import { describe, expect, it } from "vitest";
import { MARKDOWN_PATHS, notFoundMarkdown, pageMarkdown } from "@/lib/markdown";
import { llmsTxt } from "@/lib/llms";

describe("Markdown versions of pages", () => {
  it("covers every page, including /privacy", () => {
    for (const p of ["/", "/about", "/now", "/cv", "/privacy", "/work/hisab"]) {
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
});

describe("llms.txt", () => {
  it("has when-to-use guidance for agents", () => {
    const txt = llmsTxt();
    expect(txt).toMatch(/^# James Ofori Ayerakwa/);
    expect(txt).toContain("## When to use this site");
    expect(txt).not.toMatch(/\/mcp\b|server-card/);
  });
});
