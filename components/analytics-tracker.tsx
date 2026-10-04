"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, type EventValue } from "@/lib/analytics";

/**
 * Site-wide behaviour tracking for Vercel Web Analytics:
 * - clicks on anything with data-track / data-track-* attributes
 * - every outbound link and mailto click (automatic)
 * - which sections people actually see ([data-section])
 * - scroll depth milestones and engaged time, once per page
 * - returning to the tab, copying text, rage clicks
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const startRef = useRef(0);

  // Clicks: declared events, outbound links, rage clicks.
  useEffect(() => {
    let last = { x: 0, y: 0, t: 0, n: 0 };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // rage click: 3+ clicks within 600ms in the same spot
      const now = Date.now();
      const near = Math.abs(e.clientX - last.x) < 24 && Math.abs(e.clientY - last.y) < 24;
      last =
        near && now - last.t < 600
          ? { x: e.clientX, y: e.clientY, t: now, n: last.n + 1 }
          : { x: e.clientX, y: e.clientY, t: now, n: 1 };
      if (last.n === 3) trackEvent("rage_click", { element: describe(target) });

      const tracked = target.closest<HTMLElement>("[data-track]");
      if (tracked) {
        const props: Record<string, EventValue> = {};
        for (const [k, v] of Object.entries(tracked.dataset)) {
          if (k.startsWith("track") && k !== "track" && v != null) {
            props[k.slice(5, 6).toLowerCase() + k.slice(6)] = v;
          }
        }
        trackEvent(tracked.dataset.track!, props);
        return;
      }

      const a = target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("mailto:")) {
        trackEvent("email_clicked", { location: sectionOf(a) });
      } else if (/^https?:\/\//.test(href) && !href.includes(window.location.host)) {
        let host = href;
        try {
          host = new URL(href).host.replace(/^www\./, "");
        } catch {}
        trackEvent("outbound_link_clicked", { destination: host, location: sectionOf(a) });
      } else if (href.startsWith("/")) {
        trackEvent("internal_link_clicked", { to: href, location: sectionOf(a) });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Per page: section views, scroll depth, engaged time.
  useEffect(() => {
    startRef.current = Date.now();
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.section;
          if (entry.isIntersecting && name && !seen.has(name)) {
            seen.add(name);
            trackEvent("section_viewed", { section: name });
          }
        }
      },
      // a section counts as seen once it crosses the middle of the screen
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );
    const observe = () => document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
    observe();
    const t = setTimeout(observe, 1500);

    const marks = [25, 50, 75, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const m of marks) {
        if (pct >= m - 2 && !hit.has(m)) {
          hit.add(m);
          trackEvent("scroll_depth", { percent: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let sent = false;
    const sendEngagement = () => {
      if (sent) return;
      const seconds = Math.round((Date.now() - startRef.current) / 1000);
      if (seconds < 2) return;
      sent = true;
      trackEvent("page_engagement", { time: bucket(seconds), scrolled: `${Math.max(0, ...hit)}%` });
    };
    let hiddenAt = 0;
    const onVis = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
        sendEngagement();
      } else if (hiddenAt) {
        trackEvent("tab_returned", { away: bucket(Math.round((Date.now() - hiddenAt) / 1000)) });
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const onCopy = () => {
      const sel = window.getSelection();
      if (String(sel || "").trim()) trackEvent("text_copied", { section: sectionOf(sel?.anchorNode?.parentElement ?? null) });
    };
    document.addEventListener("copy", onCopy);

    return () => {
      sendEngagement();
      clearTimeout(t);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("copy", onCopy);
    };
  }, [pathname]);

  return null;
}

function sectionOf(el: Element | null): string {
  return (
    (el?.closest("[data-section]") as HTMLElement | null)?.dataset.section ??
    (el?.closest("header") ? "header" : el?.closest("footer") ? "footer" : "page")
  );
}

function describe(el: HTMLElement): string {
  const label = el.getAttribute("aria-label") || el.textContent?.trim().slice(0, 40) || el.tagName.toLowerCase();
  return `${el.tagName.toLowerCase()}:${label}`;
}

function bucket(s: number): string {
  if (s < 10) return "0-10s";
  if (s < 30) return "10-30s";
  if (s < 60) return "30-60s";
  if (s < 180) return "1-3m";
  if (s < 600) return "3-10m";
  return "10m+";
}
