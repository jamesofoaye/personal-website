import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VENTURES } from "@/lib/content";
import { BrowserFrame, PhoneFrame, VentureCover } from "@/components/device";
import { Reveal } from "@/components/reveal";
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
    title: `${v.name} — ${v.kind}`,
    description: v.summary,
    alternates: { canonical: `/work/${v.slug}` },
    openGraph: {
      type: "article",
      title: `${v.name} — James Ofori`,
      description: v.summary,
      url: `/work/${v.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${v.name} — James Ofori`,
      description: v.summary,
    },
    keywords: [v.name, v.kind, ...v.stack, "James Ofori Ayerakwa"],
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = VENTURES.findIndex((x) => x.slug === slug);
  const v = VENTURES[index];
  if (!v) notFound();
  const next = VENTURES[(index + 1) % VENTURES.length]!;

  return (
    <article className="pt-28 sm:pt-36">
      <JsonLd data={caseStudyGraph(v)} />
      <header className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Link
            href="/#work"
            className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
          >
            ← All work
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
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
            <h1
              className="mt-4 w-fit bg-clip-text pb-2 font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.95] text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${v.gradient[0]}, ${v.gradient[1]})`,
              }}
            >
              {v.name}
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-2xl text-2xl leading-snug font-semibold text-muted sm:text-3xl">
                {v.tagline}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm">
              <div className="col-span-2">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Role
                </dt>
                <dd className="mt-1 text-ink">{v.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  When
                </dt>
                <dd className="mt-1 text-ink">{v.period}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Where
                </dt>
                <dd className="mt-1 text-ink">{v.place}</dd>
              </div>
              {v.url && (
                <div className="col-span-2">
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                    Live
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener"
                      className="text-ink underline decoration-gold decoration-2 underline-offset-4"
                    >
                      {v.urlLabel} ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>
      </header>

      <Reveal className="mx-auto mt-14 max-w-[96rem] px-3 sm:px-5" y={40}>
        <VentureCover
          venture={v}
          size="hero"
          priority
          className="aspect-[4/5] rounded-xl sm:aspect-[16/9] lg:aspect-[21/10]"
        />
      </Reveal>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <dl className="grid gap-px overflow-hidden border-b border-line bg-line sm:grid-cols-3">
          {v.metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.06}
              className="flex flex-col-reverse bg-bg py-8 sm:px-6 sm:first:pl-0"
            >
              <dt className="mt-1 text-sm text-muted">{m.label}</dt>
              <dd className="font-display text-5xl text-ink">{m.value}</dd>
            </Reveal>
          ))}
        </dl>

        <section className="grid gap-6 py-20 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Why it exists
          </h2>
          <Reveal>
            <p className="font-display text-3xl leading-tight text-pretty text-ink sm:text-4xl">
              {v.summary}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{v.problem}</p>
          </Reveal>
        </section>

        <section className="grid gap-6 border-t border-line py-20 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
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
          <section className="grid gap-6 border-t border-line py-20 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
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
          <section className="border-t border-line py-20 md:py-28">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Screens
            </h2>
            {v.shots[0]!.frame === "phone" ? (
              <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
                {v.shots.map((shot) => (
                  <li key={shot.src} className="w-[62%] shrink-0 snap-center sm:w-[240px]">
                    <PhoneFrame shot={{ ...shot, alt: "" }} sizes="240px" />
                    <p className="mt-4 text-sm text-muted">{shot.alt}</p>
                  </li>
                ))}
              </ul>
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

        <section className="grid gap-6 border-t border-line py-20 md:grid-cols-[1fr_2fr] md:gap-12">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Stack</h2>
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

      <Link href={`/work/${next.slug}`} className="group block border-t border-line">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-20 sm:px-8 sm:py-28">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Next</p>
            <p className="mt-3 font-display text-[clamp(3rem,9vw,8rem)] leading-none text-ink transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4">
              {next.name}
            </p>
          </div>
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-full border border-ink text-2xl text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-white"
          >
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
