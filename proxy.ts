import { NextResponse, type NextRequest } from "next/server";

/**
 * Markdown content negotiation for AI agents.
 * - `Accept: text/markdown` (preferred over HTML) → the Markdown version
 * - any page URL + `.md` (e.g. /about.md, /index.md) → the Markdown version
 * Everything else passes through, with `Vary: Accept` so caches keep the two apart.
 */
export function prefersMarkdown(accept: string | null) {
  if (!accept) return false;
  let md = -1;
  let html = -1;
  for (const part of accept.split(",")) {
    const [type = "", ...params] = part.trim().toLowerCase().split(";");
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? Number(qParam.trim().slice(2)) || 0 : 1;
    if (type.trim() === "text/markdown") md = Math.max(md, q);
    if (type.trim() === "text/html") html = Math.max(html, q);
  }
  return md > 0 && md >= html;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const mdSuffix = pathname.endsWith(".md");

  if (mdSuffix || prefersMarkdown(req.headers.get("accept"))) {
    let target = mdSuffix ? pathname.slice(0, -3) : pathname;
    if (target === "/index" || target === "") target = "/";
    const url = req.nextUrl.clone();
    url.pathname = target === "/" ? "/md" : `/md${target}`;
    return NextResponse.rewrite(url);
  }

  const res = NextResponse.next();
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  // pages only: skip Next internals, the markdown route itself and static files
  matcher: [
    "/((?!_next/|md(?:/|$)|api/|icons/|globe/|work/[^/]+/(?:opengraph|twitter)-image|opengraph-image|twitter-image|apple-icon|icon\\.svg|favicon|robots\\.txt|sitemap\\.xml|llms|manifest|.*\\.(?:png|jpe?g|webp|avif|svg|ico|bin|woff2?|txt|xml|webmanifest|js|css|map)$).*)",
  ],
};
