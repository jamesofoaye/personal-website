import { Reveal, WordReveal } from "./reveal";

/** The original site's section label: a black bar with a gold orb. */
export function LabelBar({
  children,
  invert = false,
}: {
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <p className={`label-bar text-[15px] sm:text-lg ${invert ? "!bg-white !text-ink" : ""}`}>
      {children}
      <span
        aria-hidden
        className="size-[15px] rounded-full"
        style={{
          background: "linear-gradient(to bottom, rgba(227,173,46,1) 0%, rgba(41,47,143,0) 100%)",
        }}
      />
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  invert = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  invert?: boolean;
}) {
  return (
    <div>
      <Reveal>
        <LabelBar invert={invert}>{eyebrow}</LabelBar>
      </Reveal>
      <WordReveal
        as="h2"
        text={title}
        className={`mt-10 block max-w-4xl font-display text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[1] text-balance ${invert ? "text-white" : "text-ink"}`}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-pretty ${invert ? "text-white/70" : "text-muted"}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
