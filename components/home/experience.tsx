import Image from "next/image";
import { EXPERIENCE, SKILLS, ARCHIVE } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        eyebrow="Working Experience"
        title="I have been building software professionally since 2020."
        intro="I taught myself to code in 2019 and started working professionally the year after. I do my best work in small teams, close to product and design, where I can take an idea all the way to the app stores."
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
        <h2 className="text-sm font-bold tracking-wide text-ink uppercase">
          Other things I have built
        </h2>
      </Reveal>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {ARCHIVE.map((a, i) => (
          <li key={a.name} className={i === 0 ? "sm:col-span-2" : undefined}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <a
                href={a.url}
                target="_blank"
                rel="noopener"
                className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgb(14_16_23/0.35)] ${i === 0 ? "sm:flex-row" : ""}`}
              >
                <div
                  className={`overflow-hidden border-b border-line bg-surface ${i === 0 ? "sm:w-1/2 sm:shrink-0 sm:border-e sm:border-b-0" : ""}`}
                >
                  <Image
                    src={a.image}
                    alt={`The ${a.name} website`}
                    width={800}
                    height={500}
                    sizes="(min-width: 640px) 600px, 100vw"
                    className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <div
                  className={`flex flex-1 flex-col p-6 ${i === 0 ? "sm:justify-center sm:p-10" : ""}`}
                >
                  <p className="flex items-center justify-between font-display text-2xl text-ink">
                    {a.name}
                    <span
                      className="font-sans text-sm text-faint transition-colors group-hover:text-ink"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.note}</p>
                  <p className="mt-auto pt-4 text-xs font-medium text-faint">{a.stack}</p>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
