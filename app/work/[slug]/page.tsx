import { ViewTransition } from "react";
import type { Metadata } from "next";
import { META_DESCRIPTIONS, pageMeta } from "@/lib/meta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VENTURES } from "@/lib/content";
import { BrowserFrame, PhoneFrame, VentureCover } from "@/components/device";
import { Reveal } from "@/components/reveal";
import { TrackHorizontalScroll } from "@/components/track";
import { Tilt } from "@/components/tilt";
import { JsonLd } from "@/components/json-ld";
import { caseStudyGraph } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return VENTURES.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = VENTURES.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    ...pageMeta({
      key: v.slug as keyof typeof META_DESCRIPTIONS,
      title: `${v.name} — ${v.kind}`,
      path: `/work/${v.slug}`,
      socialTitle: `${v.name} — James Ofori`,
      type: "article",
      images: false, // this route has its own opengraph-image
    }),
    keywords: [v.name, v.kind, ...v.stack, "James Ofori Ayerakwa"],
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = VENTURES.findIndex((x) => x.slug === slug);
  const v = VENTURES[index];
  if (!v) notFound();
  const next = VENTURES[(index + 1) % VENTURES.length]!;
  const prev = VENTURES[(index - 1 + VENTURES.length) % VENTURES.length]!;

  return (
    <article className="pt-28 sm:pt-36">
      <JsonLd data={caseStudyGraph(v)} />
      <header data-section="case_header" className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Link
            href="/#work"
            className="-my-3 inline-flex min-h-11 items-center font-mono text-xs tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
          >
            ← All work
          </Link>
        </Reveal>
        <div className="mt-10">
          <p className="label-bar text-[15px]">
            {v.kind}
            <span
              aria-hidden
              className="size-[15px] rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(227,173,46,1) 0%, rgba(41,47,143,0) 100%)",
              }}
            />
          </p>
          {/* morphs from the project name on the home list or the "Next" link */}
          <ViewTransition name={`case-title-${v.slug}`} share="morph" default="none">
            <h1
              className={`mt-6 w-fit max-w-full bg-clip-text pb-2 font-display leading-[0.95] break-words text-transparent ${
                v.name.length > 12
                  ? "text-[clamp(1.75rem,8vw,6.5rem)]"
                  : "text-[clamp(3.2rem,9vw,8rem)]"
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, ${v.gradient[0]}, ${v.gradient[1]})`,
              }}
            >
              {v.name}
            </h1>
          </ViewTransition>
          {/* CSS animation, not JS: the tagline is often the LCP element */}
          <p
            className="rise mt-6 max-w-3xl text-lg leading-snug font-semibold text-muted sm:text-2xl lg:text-3xl"
            style={{ animationDelay: "0.15s" }}
          >
            {v.tagline}
          </p>
        </div>

        <div className="rise" style={{ animationDelay: "0.25s" }}>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-4">
            <div>
              <dt className="font-mono text-xs tracking-[0.16em] text-faint uppercase">Role</dt>
              <dd className="mt-2 text-[15px] text-ink">{v.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.16em] text-faint uppercase">When</dt>
              <dd className="mt-2 text-[15px] text-ink">{v.period}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.16em] text-faint uppercase">Where</dt>
              <dd className="mt-2 text-[15px] text-ink">{v.place}</dd>
            </div>
            {v.url && (
              <div>
                <dt className="font-mono text-xs tracking-[0.16em] text-faint uppercase">Live</dt>
                <dd className="mt-2 text-[15px]">
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener"
                    className="-my-3 inline-flex min-h-11 max-w-full items-center [overflow-wrap:anywhere] text-ink underline decoration-gold decoration-2 underline-offset-4"
                  >
                    {v.urlLabel}&nbsp;↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <Reveal className="mx-auto mt-14 max-w-[96rem] px-5" y={40}>
        <Tilt
          className={`sm:aspect-[16/9] lg:aspect-[21/10] ${v.shots[0]?.frame === "browser" ? "aspect-[5/4]" : "aspect-[4/5]"}`}
        >
          <VentureCover venture={v} size="hero" priority className="size-full rounded-xl" />
        </Tilt>
      </Reveal>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <dl className="grid grid-cols-3 gap-px overflow-hidden border-b border-line bg-line">
          {v.metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.06}
              className="flex flex-col-reverse justify-end bg-bg px-2 py-6 first:pl-0 sm:px-6 sm:py-8"
            >
              <dt className="mt-2 text-xs leading-snug text-muted sm:text-sm">{m.label}</dt>
              <dd className="font-display text-[clamp(1.4rem,7vw,3rem)] leading-none break-words text-ink">
                {m.value}
              </dd>
            </Reveal>
          ))}
        </dl>

        <section
          data-section="why_it_exists"
          className="grid gap-6 py-16 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28"
        >
          <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Why it exists
          </h2>
          <Reveal>
            <p className="text-xl leading-snug font-bold text-pretty text-ink sm:font-display sm:text-4xl sm:leading-tight">
              {v.summary}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{v.problem}</p>
          </Reveal>
        </section>

        <section
          data-section="what_i_built"
          className="grid gap-6 border-t border-line py-16 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28"
        >
          <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {v.builtHeading ?? "What I built"}
          </h2>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {v.built.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={(i % 2) * 0.06}>
                  <span className="font-mono text-xs text-gold-ink">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-medium text-ink">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {v.ai && (
          <section
            data-section="how_ai_is_used"
            className="grid gap-6 border-t border-line py-16 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28"
          >
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              How AI is used
            </h2>
            <div className="grid gap-4">
              {v.ai.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06}>
                  <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
                    <h3 className="font-display text-3xl text-ink">{a.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {v.shots.length > 1 && (
          <section data-section="screens" className="border-t border-line py-16 md:py-28">
            <div className="flex items-baseline justify-between">
              <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Screens</h2>
              {v.shots[0]!.frame === "phone" && (
                <p className="text-xs text-faint sm:hidden">
                  Swipe <span aria-hidden>→</span>
                </p>
              )}
            </div>
            {v.shots[0]!.frame === "phone" ? (
              <TrackHorizontalScroll
                event="screens_swiped"
                props={{ project: v.slug }}
                className="-mx-5 mt-10 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0 [scrollbar-width:thin]"
              >
                <ul className="flex w-max gap-6">
                  {v.shots.map((shot) => (
                    <li
                      key={shot.src}
                      className="w-[62vw] max-w-[260px] shrink-0 snap-center sm:w-[240px]"
                    >
                      <PhoneFrame shot={{ ...shot, alt: "" }} sizes="240px" />
                      <p className="mt-4 text-sm text-muted">{shot.alt}</p>
                    </li>
                  ))}
                </ul>
              </TrackHorizontalScroll>
            ) : (
              <ul className="mt-10 grid gap-10">
                {v.shots.map((shot) => (
                  <li key={shot.src}>
                    <BrowserFrame shot={{ ...shot, alt: "" }} url={`${v.name} · API Hub`} />
                    <p className="mt-4 text-sm text-muted">{shot.alt}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section
          data-section="stack"
          className="grid gap-6 border-t border-line py-16 md:grid-cols-[1fr_2fr] md:gap-12"
        >
          <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Stack</h2>
          <div>
            <ul className="flex flex-wrap gap-2">
              {v.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
            {v.credit && <p className="mt-8 max-w-xl text-sm text-faint">{v.credit}</p>}
          </div>
        </section>
      </div>

      <nav aria-label="More case studies" className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          data-track="project_opened"
          data-track-project={next.slug}
          data-track-from="next_project"
          className="group block"
        >
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-16 sm:px-8 sm:py-28">
            <div className="min-w-0">
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                Next · {next.kind}
              </p>
              <ViewTransition name={`case-title-${next.slug}`} share="morph" default="none">
                <p
                  className={`mt-3 font-display leading-none [overflow-wrap:normal] text-ink transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 ${
                    next.name.length > 12
                      ? "text-[clamp(1.75rem,7.5vw,7rem)]"
                      : "text-[clamp(2.5rem,10vw,8rem)]"
                  }`}
                >
                  {next.name}
                </p>
              </ViewTransition>
            </div>
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-full border border-ink text-2xl text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-white sm:size-16"
            >
              →
            </span>
          </div>
        </Link>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 border-t border-line px-5 sm:px-8">
          <Link
            href={`/work/${prev.slug}`}
            data-track="project_opened"
            data-track-project={prev.slug}
            data-track-from="previous_project"
            className="inline-flex min-h-14 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden>←</span> Previous: {prev.name}
          </Link>
          <Link
            href="/#work"
            className="inline-flex min-h-14 items-center text-sm text-muted transition-colors hover:text-ink"
          >
            All work
          </Link>
        </div>
      </nav>
    </article>
  );
}
