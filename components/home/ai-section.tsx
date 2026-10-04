import { AI_SYSTEMS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const PRINCIPLES = [
  { k: "Permissions first", v: "Agents act with the user's own access — never a superuser key." },
  {
    k: "Minimum context",
    v: "Models see anonymised, task-specific data. PII stays out by construction.",
  },
  {
    k: "Human in control",
    v: "Every draft, plan and letter is the user's to accept, edit or bin.",
  },
];

export function AiSection() {
  return (
    <section id="ai" className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-[#0e1017] px-5 py-24 text-white ring-1 ring-white/10 sm:rounded-[2.5rem] sm:px-10 sm:py-32 lg:px-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e6af2e 1px, transparent 1px), linear-gradient(to bottom, #e6af2e 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[#e6af2e]/15 blur-3xl"
        />

        <div className="mx-auto max-w-6xl">
          <SectionHeading
            invert
            eyebrow="Applied AI"
            title="AI in production, not in a pitch deck."
            intro="Agents, voice, extraction and MCP tooling that real people use every day — in a national e-invoicing platform, a personal-finance app and a delivery company."
          />

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AI_SYSTEMS.map((s, i) => (
              <li
                key={s.name}
                className={i === 0 ? "sm:col-span-2" : s.wide ? "lg:col-span-2" : undefined}
              >
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-[#e6af2e]/50 hover:bg-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl">{s.name}</h3>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#a9acb5] uppercase">
                        {s.where}
                      </span>
                    </div>
                    <ol className="relative mt-6 space-y-4 ps-6">
                      <span
                        aria-hidden
                        className="absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b from-white/25 via-[#e6af2e]/60 to-white/25"
                      />
                      <span
                        aria-hidden
                        className="absolute left-[2px] size-[7px] rounded-full bg-[#e6af2e] shadow-[0_0_12px_#e6af2e]"
                        style={{
                          animation: `flow 3.2s ${i * 0.4}s cubic-bezier(.65,0,.35,1) infinite`,
                        }}
                      />
                      {[
                        ["In", s.input],
                        ["Does", s.does],
                        ["Out", s.output],
                      ].map(([k, v]) => (
                        <li key={k} className="relative">
                          <span
                            aria-hidden
                            className="absolute top-[7px] -left-[22px] size-[9px] rounded-full border border-white/30 bg-[#0e1017]"
                          />
                          <span className="block font-mono text-[10px] tracking-[0.16em] text-[#8d909a] uppercase">
                            {k}
                          </span>
                          <span className="text-[15px] leading-snug text-[#e8e9ec]">{v}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <dl className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08}>
                <dt className="font-mono text-[11px] tracking-[0.16em] text-[#e6af2e] uppercase">
                  {p.k}
                </dt>
                <dd className="mt-2 text-[#a9acb5]">{p.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
