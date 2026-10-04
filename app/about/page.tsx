import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Self-taught engineer from Ghana, building in Abu Dhabi: the path from Andela to leading frontend and applied AI on a national platform.",
  alternates: { canonical: "/about" },
};

const CHAPTERS = [
  {
    year: "2019",
    title: "Teaching myself",
    body: "I started coding in 2019 and never really stopped. A Google IT Support certificate first, then Andela's React programme — and a habit of learning by shipping.",
  },
  {
    year: "2020",
    title: "Shipping for others",
    body: "Professional work from 2020: client web apps at MCAT Global, then managing a small frontend team at Hexlen. That's where I learned that code is the easy half; scope and people are the rest.",
  },
  {
    year: "2021",
    title: "Building in Ghana",
    body: "I joined Dawurobo as VP of Engineering and equity partner. Delivery, payments, bulk SMS, commerce — infrastructure that has to work on real roads for real vendors.",
  },
  {
    year: "2022",
    title: "Building in the UAE",
    body: "Frontend at DAT Engineering Consultancy and Yallah Property, then in 2024 Oxinus Holdings, part of IHC, where I lead frontend on Verinvo and helped build its AI agent.",
  },
  {
    year: "2025",
    title: "Building my own",
    body: "Hisab and DrivingInstructor.ae: products for the people around me in the UAE, built end to end — mobile, web, AI, growth — and run in public.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="Self-taught. Ghanaian. Building in Abu Dhabi.">
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
          I&rsquo;m James Ofori Ayerakwa. I build web, mobile and AI products end to end, and I care
          most about the unglamorous parts — permissions, privacy, the second language, the slow
          network — because that&rsquo;s where products earn trust.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
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

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-3">
        {[
          {
            k: "How I work",
            v: "Small teams, close to product and design. I write the spec, build the thing, measure it, and write down what we learned. AI-assisted development is part of the daily workflow, not a novelty.",
          },
          {
            k: "What I care about",
            v: "Privacy by design, RTL and multilingual done properly, and software that respects people who are stressed, busy or new to a country.",
          },
          {
            k: "Outside the code",
            v: "I founded OJA Studios, a documentary company in Ghana behind The Rise Of. I'm also learning Arabic.",
          },
        ].map((x, i) => (
          <Reveal
            key={x.k}
            delay={i * 0.06}
            className="rounded-3xl border border-line bg-surface p-7"
          >
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{x.k}</h2>
            <p className="mt-4 leading-relaxed text-ink">{x.v}</p>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
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
