import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80dvh] max-w-7xl flex-col justify-center px-5 pt-28 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Page not found</p>
      <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] text-ink">
        I couldn&rsquo;t find that page. It may have moved, or the link may be wrong.
      </h1>
      <Link
        href="/"
        className="mt-10 w-fit rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg"
      >
        Back home
      </Link>
    </section>
  );
}
