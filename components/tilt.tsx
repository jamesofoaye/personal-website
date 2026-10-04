"use client";

import { useEffect, useRef } from "react";

/**
 * Gives a cover real depth. On desktop it leans toward the cursor with a moving
 * highlight; on phones it tips back gently as it scrolls through the screen.
 * Does nothing under reduced motion.
 */
export function Tilt({
  className,
  children,
  max = 7,
}: {
  className?: string;
  children: React.ReactNode;
  max?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const el = inner.current;
    if (!o || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let gx = 50;
    let gy = 30;
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `rotateX(${y.toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`;
      // children can parallax against the tilt with these
      el.style.setProperty("--tilt-x", (x / max).toFixed(3));
      el.style.setProperty("--tilt-y", (-y / max).toFixed(3));
      if (glare.current) {
        glare.current.style.background = `radial-gradient(600px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.18), transparent 45%)`;
      }
      if (Math.abs(tx - x) > 0.01 || Math.abs(ty - y) > 0.01) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => !raf && (raf = requestAnimationFrame(loop));

    if (fine) {
      const onMove = (e: PointerEvent) => {
        const r = o.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        tx = (px - 0.5) * max * 2;
        ty = -(py - 0.5) * max;
        gx = px * 100;
        gy = py * 100;
        if (glare.current) glare.current.style.opacity = "1";
        kick();
      };
      const onLeave = () => {
        tx = 0;
        ty = 0;
        if (glare.current) glare.current.style.opacity = "0";
        kick();
      };
      o.addEventListener("pointermove", onMove);
      o.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(raf);
        o.removeEventListener("pointermove", onMove);
        o.removeEventListener("pointerleave", onLeave);
      };
    }

    const onScroll = () => {
      const r = o.getBoundingClientRect();
      const p = (r.top + r.height / 2) / window.innerHeight - 0.5; // -0.5 … 0.5
      ty = Math.max(-1, Math.min(1, p)) * max * 1.2;
      kick();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [max]);

  return (
    <div ref={outer} className={className} style={{ perspective: "1400px" }}>
      <div ref={inner} className="relative size-full rounded-xl will-change-transform">
        {children}
        <div
          ref={glare}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500"
        />
      </div>
    </div>
  );
}
