import type { Metadata } from "next";
import Link from "next/link";
import { TrackOnMount } from "@/components/track";
import { VENTURES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      data-section="not_found"
      className="mx-auto flex min-h-[80dvh] max-w-7xl flex-col justify-center px-5 pt-28 sm:px-8"
    >
      <TrackOnMount event="page_not_found" />
      <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Page not found</p>
      <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] text-ink">
        I couldn&rsquo;t find that page. It may have moved, or the link may be wrong.
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-medium text-bg"
        >
          Back home
        </Link>
        <Link
          href="/#work"
          className="inline-flex min-h-12 items-center rounded-full border border-ink px-6 text-sm font-medium text-ink"
        >
          See the work
        </Link>
      </div>
      <p className="mt-14 text-sm text-muted">Or open one of these case studies:</p>
      <ul className="mt-3 flex flex-col border-t border-line">
        {VENTURES.slice(0, 4).map((v) => (
          <li key={v.slug} className="border-b border-line">
            <Link
              href={`/work/${v.slug}`}
              className="flex min-h-14 items-center justify-between gap-4 py-3 text-ink hover:text-gold-ink"
            >
              <span className="font-display text-xl">{v.name}</span>
              <span className="text-right text-sm text-muted">{v.kind}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
