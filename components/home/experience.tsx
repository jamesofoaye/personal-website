import { EXPERIENCE, SKILLS, ARCHIVE } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        eyebrow="Working Experience"
        title="Six years of shipping, most of it in parallel."
        intro="Self-taught, coding since 2019, professional since 2020. I work best in small teams, close to product and design, carrying ideas from first sketch to the app stores."
      />
      <ol className="mt-16 border-t border-line sm:mt-20">
        {EXPERIENCE.map((e, i) => (
          <li key={`${e.org}-${e.role}`} className="border-b border-line">
            <Reveal y={12} delay={i * 0.03}>
              <div className="grid gap-1 py-6 md:grid-cols-[12rem_1fr_1fr] md:gap-8">
                <span className="text-sm text-faint md:pt-1">{e.period}</span>
                <div>
                  <p className="text-lg text-ink">{e.role}</p>
                  <p className="text-muted">
                    {e.org} <span className="text-faint">· {e.place}</span>
                  </p>
                </div>
                <p className="text-sm text-muted md:pt-1.5">{e.note}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  const all = SKILLS.flatMap((g) => g.items);
  return (
    <section aria-labelledby="skills-title" className="py-10">
      {/* moving band of the stack */}
      <div
        className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-hidden
      >
        <div className="marquee flex w-max gap-10 font-display text-4xl whitespace-nowrap text-ink/50 sm:text-5xl">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s}
              <span className="size-1.5 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <h2 id="skills-title" className="mb-12 flex justify-end">
          <span className="label-bar text-[15px] sm:text-lg">
            Technologies I Use
            <span
              aria-hidden
              className="size-[15px] rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(227,173,46,1) 0%, rgba(41,47,143,0) 100%)",
              }}
            />
          </span>
        </h2>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.06}>
              <h3 className="text-sm font-bold tracking-wide text-ink uppercase">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Archive() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <h2 className="text-sm font-bold tracking-wide text-ink uppercase">Also built</h2>
      </Reveal>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
        {ARCHIVE.map((a) => {
          const inner = (
            <>
              <p className="flex items-center justify-between font-display text-2xl text-ink">
                {a.name}
                {"url" in a && (
                  <span
                    className="font-sans text-sm text-faint transition-colors group-hover:text-gold"
                    aria-hidden
                  >
                    ↗
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted">{a.note}</p>
              <p className="mt-4 text-xs font-medium text-faint">{a.stack}</p>
            </>
          );
          return (
            <li key={a.name} className="bg-bg">
              {"url" in a ? (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener"
                  className="group block h-full p-6 transition-colors hover:bg-surface"
                >
                  {inner}
                </a>
              ) : (
                <div className="h-full p-6">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
