import { PERSON } from "@/lib/site";
import { CopyEmail, EmailLink } from "@/components/email-link";
import { Reveal, WordReveal } from "@/components/reveal";
import { LabelBar } from "@/components/section-heading";

export function Contact() {
  return (
    <section
      id="contact"
      data-section="contact"
      className="relative isolate overflow-hidden px-5 py-32 sm:px-8 sm:py-44"
    >
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-1/2 -z-10 aspect-square w-[120vw] max-w-[1400px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(230 175 46 / 0.18), transparent 60%)" }}
      />
      <div className="mx-auto max-w-5xl text-center">
        <Reveal className="flex justify-center">
          <LabelBar>Let&rsquo;s talk</LabelBar>
        </Reveal>
        <WordReveal
          as="h2"
          text="If you are building something, I would like to hear about it."
          className="mt-10 block font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] text-balance text-ink"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted">
            Send me a message about a product idea, an AI problem or something you are building for
            the UAE or Ghana. I read every message and I will get back to you.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <EmailLink className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-8 py-3.5 text-lg text-white transition-colors hover:bg-white hover:text-ink">
              Send an email
            </EmailLink>
            <CopyEmail className="rounded-full border border-ink px-8 py-3.5 text-lg text-ink transition-colors hover:bg-ink hover:text-white" />
            <a
              href={PERSON.links.linkedin}
              target="_blank"
              rel="me noopener"
              className="rounded-full border border-ink px-8 py-3.5 text-lg text-ink transition-colors hover:bg-ink hover:text-white"
            >
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
