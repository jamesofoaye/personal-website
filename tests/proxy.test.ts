import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { prefersMarkdown, proxy } from "@/proxy";

const req = (path: string, accept?: string) =>
  new NextRequest(`https://jamesofoaye.dev${path}`, { headers: accept ? { accept } : {} });

describe("prefersMarkdown", () => {
  it.each([
    ["text/markdown", true],
    ["text/markdown, text/html;q=0.9", true],
    ["text/html, text/markdown;q=0.5", false],
    ["text/html,application/xhtml+xml,*/*;q=0.8", false],
    ["*/*", false],
    ["application/json, text/event-stream", false],
    ["text/markdown;q=0", false],
  ])("%s → %s", (accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected);
  });
});

describe("proxy", () => {
  const rewrite = (r: Response) => r.headers.get("x-middleware-rewrite");

  it("rewrites Accept: text/markdown to the Markdown route", () => {
    expect(rewrite(proxy(req("/", "text/markdown")))).toBe("https://jamesofoaye.dev/md");
    expect(rewrite(proxy(req("/work/hisab", "text/markdown")))).toBe(
      "https://jamesofoaye.dev/md/work/hisab",
    );
  });

  it("rewrites .md URLs, including /index.md", () => {
    expect(rewrite(proxy(req("/about.md")))).toBe("https://jamesofoaye.dev/md/about");
    expect(rewrite(proxy(req("/index.md")))).toBe("https://jamesofoaye.dev/md");
    expect(rewrite(proxy(req("/developers.md")))).toBe("https://jamesofoaye.dev/md/developers");
  });

  it("passes HTML requests through with Vary: Accept", () => {
    const res = proxy(req("/about", "text/html"));
    expect(rewrite(res)).toBeNull();
    expect(res.headers.get("vary")).toBe("Accept");
  });
});
