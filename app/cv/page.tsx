import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { EXPERIENCE, SKILLS, VENTURES } from "@/lib/content";
import { PERSON } from "@/lib/site";
import { EmailLink } from "@/components/email-link";
import { PrintButton } from "./print-button";

export const metadata: Metadata = pageMeta({
  key: "cv",
  title: "CV",
  path: "/cv",
  socialTitle: "CV — James Ofori Ayerakwa",
  type: "profile",
});

const STRENGTHS = [
  [
    "Applied AI engineering",
    "I build LLM agents, voice features, MCP servers and document and photo extraction, and I design them so the AI only sees anonymised data.",
  ],
  [
    "Regulated, data-heavy products",
    "I have built e-invoicing that meets national rules, as well as payments, logistics and marketplaces.",
  ],
  [
    "Taking products from idea to launch",
    "I take products from an idea to launch across mobile, web and API, and I help small teams ship more by sharing AI-assisted workflows.",
  ],
  [
    "Team leadership",
    "I lead the engineering team at Dawurobo, I led a frontend team at Hexlen, and I introduced the AI workflow the Verinvo frontend team uses today.",
  ],
  [
    "Frontend architecture",
    "I build shared permission and design-system packages, and interfaces in English, Arabic, Hindi and Urdu, including right-to-left layouts.",
  ],
] as const;

export default function CvPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-28 sm:px-8 sm:pt-40 print:p-0 print:text-black">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">{PERSON.name}</h1>
          <p className="mt-2 text-lg text-muted">{PERSON.role}</p>
          <p className="mt-3 text-sm text-muted">
            {PERSON.location} ·{" "}
            <EmailLink className="underline decoration-gold underline-offset-4" /> ·{" "}
            <a
              href={PERSON.links.linkedin}
              className="underline decoration-gold underline-offset-4"
            >
              linkedin.com/in/jamesofoaye
            </a>
          </p>
        </div>
        <PrintButton />
      </header>

      <section className="py-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Profile</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          I am a frontend and applied AI engineer. I have been coding since 2019 and building
          production web and mobile products professionally since 2020, in TypeScript, React,
          Next.js and React Native. I lead the frontend of Verinvo, a Ministry of Finance-accredited
          e-invoicing platform in the UAE, at Oxinus Holdings (IHC Group), and helped build its AI
          agent, Ask Verinvo, with colleagues across product, MCP tooling and backend. Outside work
          I co-founded Hisab, started DrivingInstructor.ae, and have led engineering at Dawurobo in
          Ghana since 2021.
        </p>
      </section>

      <section className="border-t border-line py-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Core strengths</h2>
        <dl className="mt-4 grid gap-4">
          {STRENGTHS.map(([k, v]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-medium text-ink">{k}</dt>
              <dd className="text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line py-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Ventures</h2>
        <div className="mt-6 grid gap-10">
          {VENTURES.filter((v) => v.slug !== "oja-studios" && v.slug !== "personal-vpn").map(
            (v) => (
              <div key={v.slug} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium text-ink">
                    {v.name} <span className="font-normal text-muted">— {v.role}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint">{v.period}</span>
                </div>
                <p className="mt-1 text-muted">{v.summary}</p>
                <ul className="mt-3 list-disc space-y-1 ps-5 text-[15px] text-muted marker:text-gold">
                  {[...(v.ai ?? []), ...v.built].slice(0, 5).map((b) => (
                    <li key={b.title}>
                      <span className="text-ink">{b.title}.</span> {b.body}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="border-t border-line py-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Experience</h2>
        <ol className="mt-4 grid gap-4">
          {EXPERIENCE.map((e) => (
            <li key={`${e.org}-${e.role}`} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <span className="font-mono text-xs text-faint sm:pt-1">{e.period}</span>
              <div>
                <p className="text-ink">
                  {e.role} ·{" "}
                  <span className="text-muted">
                    {e.org}, {e.place}
                  </span>
                </p>
                <p className="text-sm text-muted">{e.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line py-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Skills</h2>
        <dl className="mt-4 grid gap-3">
          {SKILLS.map((g) => (
            <div key={g.group} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-ink">{g.group}</dt>
              <dd className="text-muted">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line py-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
          Education &amp; other
        </h2>
        <ul className="mt-4 grid gap-2 text-muted">
          <li>
            Google IT Support Professional Certificate · Andela React Learning Program (Web
            Application Developer)
          </li>
          <li>
            Founder, OJA Studios — documentary production company in Ghana behind “The Rise Of”.
          </li>
        </ul>
      </section>
    </div>
  );
}
