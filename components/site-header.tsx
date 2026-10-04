"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, PERSON } from "@/lib/site";
import { EmailLink } from "@/components/email-link";
import { trackEvent } from "@/lib/analytics";

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

  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // The open menu behaves like a modal: Escape closes it, scroll is locked,
  // the page behind is inert, focus moves in and stays in, then returns.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const behind = [document.getElementById("main"), document.querySelector("footer")];
    behind.forEach((el) => el && (el.inert = true));
    document.documentElement.style.overflow = "hidden";
    const first = () => menuRef.current?.querySelector<HTMLElement>("a");
    const t = setTimeout(() => first()?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current || !toggle) return;
      const items = [toggle, ...menuRef.current.querySelectorAll<HTMLElement>("a, button")];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        items[items.length - 1]?.focus();
      } else if (!e.shiftKey && i === items.length - 1) {
        e.preventDefault();
        items[0]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      behind.forEach((el) => el && (el.inert = false));
      toggle?.focus({ preventScroll: true });
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
                data-track="nav_clicked"
                data-track-item={item.label}
                data-track-menu="desktop"
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative px-5 py-2.5 text-[15px] text-ink transition-[font-weight] hover:font-semibold aria-[current=page]:font-semibold"
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
              data-track="cta_clicked"
              data-track-cta="header_lets_talk"
              className="hidden items-center gap-2 rounded-full border-2 border-ink px-5 py-2 text-[15px] text-ink transition-colors hover:bg-ink hover:text-white sm:inline-flex"
            >
              <MailIcon />
              let&rsquo;s talk
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => {
                if (!open) trackEvent("mobile_menu_opened");
                setOpen((v) => !v);
              }}
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
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 -z-10 flex flex-col justify-between overflow-y-auto bg-bg px-6 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:hidden"
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
                      data-track="nav_clicked"
                      data-track-item={item.label}
                      data-track-menu="mobile"
                      className="flex items-baseline gap-4 border-b border-line py-2.5 font-display text-[clamp(1.9rem,9vw,2.25rem)] text-ink"
                    >
                      <span className="text-xs font-semibold text-gold-ink">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <EmailLink className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-base text-white">
                  Email me
                </EmailLink>
                <a
                  href={PERSON.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-5 text-base text-ink"
                >
                  LinkedIn
                </a>
              </div>
              <p className="text-xs text-faint">Abu Dhabi · 24.45°N 54.38°E</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
