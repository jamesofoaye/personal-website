"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GlobeLoader } from "@/components/globe/globe-loader";
import { CssWords } from "@/components/reveal";
import { HERO_STATS } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      data-section="hero"
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
    >
      {/* soft light behind the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] right-[-20%] -z-10 aspect-square w-[90vw] max-w-[1100px] rounded-full opacity-60 blur-3xl lg:right-[-8%] lg:w-[60vw]"
        style={{ background: "radial-gradient(circle, rgb(230 175 46 / 0.14), transparent 60%)" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-4 px-5 sm:px-8 lg:min-h-[calc(100dvh-8rem)] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 py-6 lg:py-0">
          <div className="rise w-max" style={{ animationDelay: "0s" }}>
            <p className="text-lg font-semibold text-ink">Hello, I&rsquo;m</p>
            <div className="mt-1 h-1 w-[100px] bg-ink" aria-hidden />
          </div>

          <h1 className="mt-4 font-display text-[clamp(4.2rem,11vw,9.5rem)] leading-[0.9] text-ink">
            <CssWords text="James Ofori" delay={0.1} />
            <span className="sr-only"> Ayerakwa, Lead Frontend &amp; Applied AI Engineer</span>
          </h1>

          <p className="mt-6 max-w-xl font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.12] text-ink">
            <CssWords text="I build web and mobile products, and the" delay={0.15} />{" "}
            <span className="relative inline-block">
              <CssWords text="AI features" delay={0.35} />
              <span aria-hidden className="absolute -bottom-1 left-0 h-1 w-full bg-gold" />
            </span>{" "}
            <CssWords text="inside them." delay={0.42} />
          </p>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted"
            style={{ animationDelay: "0.3s" }}
          >
            I&rsquo;m a{" "}
            <span className="font-semibold text-ink">Lead Frontend and Applied AI Engineer</span> at
            Oxinus, part of IHC, where I lead the frontend of{" "}
            <Link
              href="/work/verinvo"
              className="text-ink underline decoration-gold decoration-2 underline-offset-4"
            >
              Verinvo
            </Link>
            , the UAE&rsquo;s Ministry of Finance-accredited e-invoicing platform. Outside work, I
            build my own products for people in the UAE and Ghana.
          </p>

          <div
            className="rise mt-8 flex items-center gap-3 sm:gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/#work"
              data-track="cta_clicked"
              data-track-cta="see_the_work"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-ink bg-ink px-5 py-3 text-base whitespace-nowrap text-white sm:flex-none sm:px-10 sm:text-lg transition-colors hover:bg-white hover:text-ink"
            >
              See the work
            </Link>
            <Link
              href="/#contact"
              data-track="cta_clicked"
              data-track-cta="get_in_touch"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-ink px-5 py-3 text-base whitespace-nowrap text-ink sm:flex-none sm:px-10 sm:text-lg transition-colors hover:bg-ink hover:text-white"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <motion.div
          style={{ scale: globeScale, y: globeY, opacity: fade }}
          className="relative -mx-5 aspect-square sm:mx-0 lg:-mr-24 lg:aspect-auto lg:h-[min(84vh,860px)]"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
          >
            <GlobeLoader className="absolute inset-0" />
          </motion.div>
          <p className="pointer-events-none absolute bottom-3 left-1/2 w-[92%] -translate-x-1/2 text-center text-[10px] font-medium tracking-[0.12em] text-faint uppercase sm:w-auto sm:text-[11px] sm:tracking-[0.14em] sm:whitespace-nowrap lg:bottom-10">
            5.60°N 0.19°W <span className="text-gold">⟶</span> 24.45°N 54.38°E{" "}
            <span className="hidden sm:inline">· drag to spin</span>
          </p>
        </motion.div>
      </div>

      {/* proof strip */}
      <div className="mx-auto mt-6 max-w-7xl px-5 sm:px-8 lg:mt-0">
        <dl className="grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line lg:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className="rise bg-bg px-4 py-6 sm:px-6"
              style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[clamp(1.6rem,8vw,2.75rem)] text-ink">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
