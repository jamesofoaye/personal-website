import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { EXPERIENCE, SKILLS, VENTURES } from "@/lib/content";
import { PERSON } from "@/lib/site";
import { CV_EXTRAS, CV_PROFILE, STRENGTHS } from "@/lib/cv";
import { EmailLink } from "@/components/email-link";
import { PrintButton } from "./print-button";

export const metadata: Metadata = pageMeta({
  key: "cv",
  title: "CV",
  path: "/cv",
  socialTitle: "CV — James Ofori Ayerakwa",
  type: "profile",
});

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
        <p className="mt-4 text-lg leading-relaxed text-ink">{CV_PROFILE}</p>
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
          {CV_EXTRAS.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
