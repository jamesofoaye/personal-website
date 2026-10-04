import { Reveal, WordReveal } from "./reveal";
import { LabelBar } from "./section-heading";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-5 pt-32 pb-12 sm:px-8 sm:pt-40">
      <Reveal>
        <LabelBar>{eyebrow}</LabelBar>
      </Reveal>
      <WordReveal
        as="h1"
        text={title}
        className="mt-10 block max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] text-balance text-ink"
      />
      {children && <Reveal delay={0.2}>{children}</Reveal>}
    </header>
  );
}
