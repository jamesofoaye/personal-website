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
    body: "I started coding in 2019 and I haven't stopped since. I earned the Google IT Support certificate first, then went through Andela's React programme, and I learned most of what I know by building real things.",
  },
  {
    year: "2020",
    title: "Shipping for others",
    body: "I started working professionally in 2020, building web apps for clients at MCAT Global. At Hexlen I managed a small frontend team, and I learned that writing the code is only part of the job. Agreeing on scope and working well with people matter just as much.",
  },
  {
    year: "2021",
    title: "Building in Ghana",
    body: "I joined Dawurobo as VP of Engineering and became an equity partner. We build delivery, payments, bulk SMS and e-commerce products for vendors and customers across Ghana, and they have to work every single day.",
  },
  {
    year: "2022",
    title: "Building in the UAE",
    body: "I moved into frontend roles at DAT Engineering Consultancy and Yallah Property. In 2024 I joined Oxinus Holdings, part of IHC, where I lead the frontend of Verinvo and helped build its AI agent.",
  },
  {
    year: "2025",
    title: "Building my own",
    body: "In 2025 I started DrivingInstructor.ae, and in 2026 I co-founded Hisab. Both are products for people around me in the UAE, and I build them end to end, from the mobile app and website to the AI features and growth.",
  },
];

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
            v: "I like working in small teams, close to product and design. I write the spec, build it, measure how people use it and write down what we learned. I use AI tools in my development work every day.",
          },
          {
            k: "What I care about",
            v: "I care about privacy, about getting Arabic and other languages right, and about software that is kind to people who are stressed, busy or new to a country.",
          },
          {
            k: "Outside the code",
            v: "I founded OJA Studios, a documentary company in Ghana that makes The Rise Of. I'm also learning Arabic.",
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
