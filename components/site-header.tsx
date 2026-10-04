"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV } from "@/lib/site";

export function Wordmark() {
  return (
    <Link href="/" className="block shrink-0" aria-label="James Ofori Ayerakwa — home">
      {/* the original JamesOfoAye wordmark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" width={238} height={46} className="h-8 w-auto sm:h-9" />
    </Link>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers which page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) =>
    setOpenOn((prev) => ((typeof v === "function" ? v(prev === pathname) : v) ? pathname : null));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; lock scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${scrolled ? "bg-white/85 shadow-sm backdrop-blur-xl" : "bg-white"}`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${scrolled ? "py-3" : "py-3 lg:py-5"}`}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative px-5 py-2 text-[15px] text-ink transition-[font-weight] hover:font-semibold aria-[current=page]:font-semibold"
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-gold transition-opacity duration-300 ${
                    isActive(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden items-center gap-2 rounded-full border-2 border-ink px-5 py-2 text-[15px] text-ink transition-colors hover:bg-ink hover:text-white sm:inline-flex"
            >
              <MailIcon />
              let&rsquo;s talk
            </Link>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-line md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-4" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 -z-10 flex flex-col justify-between bg-bg px-6 pt-28 pb-10 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {[{ label: "Home", href: "/" }, ...NAV, { label: "Contact", href: "/#contact" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-line py-3 font-display text-4xl text-ink"
                    >
                      <span className="text-xs font-semibold text-gold-ink">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
            <p className="text-xs text-faint">Abu Dhabi · 24.45°N 54.38°E</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
