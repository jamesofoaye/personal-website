"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { EmailLink } from "@/components/email-link";
import { PERSON } from "@/lib/site";

/**
 * Phones only: once the first screen has scrolled away, a small bar keeps
 * "Email me" and LinkedIn one tap away. It steps aside when the contact
 * section or the footer is on screen, so it never covers the same buttons.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setBlocked(seen.size > 0);
    });
    const t = setTimeout(() => {
      document.querySelectorAll("#contact, footer").forEach((el) => io.observe(el));
    }, 300);
    return () => {
      clearTimeout(t);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const show = past && !blocked;
  return (
    <div
      className={`fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden print:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
      aria-hidden={!show}
      data-location="sticky_cta"
      inert={!show}
    >
      <div className="flex gap-1.5 rounded-full bg-ink p-1.5 shadow-[0_12px_40px_-8px_rgb(14_16_23/0.45)] ring-1 ring-white/10">
        <EmailLink className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[15px] font-semibold text-ink">
          <span aria-hidden className="size-2 rounded-full bg-gold" />
          Email me
        </EmailLink>
        <a
          href={PERSON.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta_clicked"
          data-track-cta="sticky_linkedin"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full text-[15px] text-white"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
