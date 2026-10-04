import { AI_SYSTEMS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const PRINCIPLES = [
  {
    k: "Permissions come first",
    v: "An AI agent should only be able to do what the person using it is allowed to do. I never give agents a master key.",
  },
  {
    k: "The AI sees as little as possible",
    v: "Models get anonymised data for the task in front of them and nothing more. Personal details stay out.",
  },
  {
    k: "People stay in control",
    v: "Every plan, draft or letter the AI writes is something the person can accept, change or throw away.",
  },
];

export function AiSection() {
  return (
    <section id="ai" data-section="ai" className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[96rem] overflow-hidden rounded-2xl bg-[#0e1017] px-5 py-24 text-white ring-1 ring-white/10  sm:px-10 sm:py-32 lg:px-16">
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
            title="I build AI features that people use every day."
            intro="These are AI features I have built and shipped. They run inside a national e-invoicing platform, a personal finance app, a delivery company and a marketplace, and real people rely on them."
          />

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AI_SYSTEMS.map((s, i) => (
              <li
                key={s.name}
                className={i === 0 ? "sm:col-span-2" : s.wide ? "lg:col-span-2" : undefined}
              >
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-[#e6af2e]/50 hover:bg-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl">{s.name}</h3>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#a9acb5] uppercase">
                        {s.where}
                      </span>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#d7d9de]">{s.body}</p>
                    <span
                      aria-hidden
                      className="mt-auto block h-px w-full origin-left scale-x-0 bg-[#e6af2e] pt-px transition-transform duration-700 group-hover:scale-x-100"
                    />
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
