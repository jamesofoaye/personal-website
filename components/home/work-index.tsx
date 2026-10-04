"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { VENTURES } from "@/lib/content";
import { VentureCover } from "@/components/device";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function WorkIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        eyebrow="A few projects so far"
        title="These are the products I work on."
        intro="During the day I lead the frontend of a national e-invoicing platform. Outside of that I run my own products, lead engineering at a logistics company in Ghana and produce documentaries. Click any project to read how I built it."
      />

      <div
        ref={listRef}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
        className="relative mt-16 sm:mt-20"
      >
        <ul className="border-t border-line">
          {VENTURES.map((v, i) => (
            <li key={v.slug} onPointerEnter={() => setActive(i)} className="border-b border-line">
              <Reveal y={16} delay={i * 0.04}>
                <Link
                  href={`/work/${v.slug}`}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 py-7 sm:gap-x-8 sm:py-9 md:grid-cols-[3rem_1.4fr_1.2fr_9rem_2.5rem]"
                >
                  <span className="text-sm font-semibold text-faint">0{i + 1}</span>
                  <span
                    className="w-fit bg-clip-text pb-1 font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-none text-transparent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 md:group-hover:translate-x-4"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${v.gradient[0]}, ${v.gradient[1]})`,
                    }}
                  >
                    {v.name}
                  </span>
                  <span className="hidden text-sm text-muted md:block">
                    <span className="block text-ink">{v.kind}</span>
                    {v.role}
                  </span>
                  <span className="hidden text-sm text-faint md:block">{v.period}</span>
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center justify-self-end rounded-full border border-ink text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-white"
                  >
                    →
                  </span>
                  {/* small screens: the context goes under the name, with the poster */}
                  <span className="col-span-3 -mt-1 text-sm text-muted md:hidden">
                    {v.kind} · {v.period}
                  </span>
                  <VentureCover
                    venture={v}
                    className="col-span-3 aspect-[4/3] rounded-xl md:hidden"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* cursor-following preview on pointer devices */}
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
        >
          <AnimatePresence>
            {active !== null && VENTURES[active] && (
              <motion.div
                key={VENTURES[active].slug}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="translate-x-10 -translate-y-1/2"
              >
                <VentureCover
                  venture={VENTURES[active]}
                  className="aspect-[4/3] w-[400px] rounded-xl shadow-2xl ring-1 ring-line"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
