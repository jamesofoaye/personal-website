import { MARKDOWN_PATHS, notFoundMarkdown, pageMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

/**
 * Markdown for agents. proxy.ts rewrites requests that send
 * `Accept: text/markdown` (or end in `.md`) to /md/<path>.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return MARKDOWN_PATHS.map((p) => ({ path: p === "/" ? [] : p.slice(1).split("/") }));
}

export async function GET(_: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const pathname = "/" + path.join("/");
  const body = pageMarkdown(pathname);
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
    "X-Robots-Tag": "noindex",
    Link: `<${SITE_URL}${pathname === "/" ? "" : pathname}>; rel="canonical"`,
  };
  if (body === null) return new Response(notFoundMarkdown(pathname), { status: 404, headers });
  return new Response(body, { headers });
}
