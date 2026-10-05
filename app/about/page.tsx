import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { FAQ } from "@/lib/faq";
import { CHAPTERS, HOW_I_WORK } from "@/lib/about";
import { faqGraph, profilePageGraph } from "@/lib/structured-data";

export const metadata: Metadata = pageMeta({
  key: "about",
  title: "About",
  path: "/about",
  socialTitle: "About James Ofori Ayerakwa",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="I am a self-taught engineer from Ghana, living in Abu Dhabi."
      >
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
          I&rsquo;m James Ofori Ayerakwa. I build web, mobile and AI products from start to finish.
          The parts I care about most are the ones people rarely notice, like permissions, privacy,
          support for a second language and apps that still work on a slow network, because that is
          where people decide whether to trust a product.
        </p>
      </PageIntro>

      <section data-section="story" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <ol className="relative border-s border-line">
          {CHAPTERS.map((c, i) => (
            <li key={c.year} className="relative ps-8 pb-14 last:pb-0 sm:ps-14">
              <span
                aria-hidden
                className="absolute top-2 -left-[5px] size-[9px] rounded-full bg-gold ring-4 ring-bg"
              />
              <Reveal delay={i * 0.04}>
                <p className="font-mono text-xs text-gold-ink">{c.year}</p>
                <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{c.title}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section
        data-section="how_i_work"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-3"
      >
        {HOW_I_WORK.map((x, i) => (
          <Reveal
            key={x.k}
            delay={i * 0.06}
            className="rounded-xl border border-line bg-surface p-7"
          >
            <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{x.k}</h2>
            <p className="mt-4 leading-relaxed text-ink">{x.v}</p>
          </Reveal>
        ))}
      </section>

      <section
        aria-labelledby="faq-title"
        data-section="faq"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8"
      >
        <JsonLd data={faqGraph()} />
        <JsonLd data={profilePageGraph("/about", "About James Ofori Ayerakwa")} />
        <h2 id="faq-title" className="font-display text-4xl text-ink sm:text-5xl">
          Questions people ask me
        </h2>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <div key={f.q} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <dt className="text-lg font-semibold text-ink">{f.q}</dt>
              <dd className="leading-relaxed text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section data-section="say_hello" className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <Link
          href="/#contact"
          className="group inline-flex items-baseline gap-4 font-display text-5xl text-ink sm:text-6xl"
        >
          Say hello
          <span
            className="text-gold transition-transform duration-500 group-hover:translate-x-2"
            aria-hidden
          >
            →
          </span>
        </Link>
      </section>
    </>
  );
}
