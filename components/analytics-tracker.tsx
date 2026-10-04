"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  POSTHOG_HOST,
  POSTHOG_KEY,
  setPostHog,
  trackEvent,
  type EventProps,
} from "@/lib/analytics";

/**
 * Site-wide behaviour tracking, all in one listener set:
 * - clicks on anything with data-track / data-track-* attributes
 * - every outbound link, mailto and tel click (automatic)
 * - which sections people actually see ([data-section])
 * - scroll depth (25/50/75/90/100) and engaged time per page
 * - tab hidden / returned, copy of text, rage clicks
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const startRef = useRef(0);

  // Optional PostHog, loaded after the page is idle.
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    const load = () =>
      import("posthog-js").then(({ default: ph }) => {
        ph.init(POSTHOG_KEY!, {
          api_host: POSTHOG_HOST,
          person_profiles: "identified_only",
          capture_pageview: "history_change",
          capture_pageleave: true,
          autocapture: true,
          enable_heatmaps: true,
          session_recording: { maskAllInputs: true },
        });
        setPostHog(ph);
      });
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(load);
    else setTimeout(load, 2000);
  }, []);

  // Clicks: declared events, outbound links, rage clicks.
  useEffect(() => {
    let last = { x: 0, y: 0, t: 0, n: 0 };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // rage clicks: 3+ clicks within 600ms in the same spot
      const now = Date.now();
      const near = Math.abs(e.clientX - last.x) < 24 && Math.abs(e.clientY - last.y) < 24;
      last =
        near && now - last.t < 600
          ? { x: e.clientX, y: e.clientY, t: now, n: last.n + 1 }
          : { x: e.clientX, y: e.clientY, t: now, n: 1 };
      if (last.n === 3) trackEvent("rage_click", { element: describe(target) });

      const tracked = target.closest<HTMLElement>("[data-track]");
      if (tracked) {
        const props: EventProps = {};
        for (const [k, v] of Object.entries(tracked.dataset)) {
          if (k.startsWith("track") && k !== "track" && v != null) {
            props[k.slice(5, 6).toLowerCase() + k.slice(6)] = v;
          }
        }
        trackEvent(tracked.dataset.track!, props);
      }

      const a = target.closest("a");
      if (!a || tracked) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("mailto:")) trackEvent("email_clicked", { location: sectionOf(a) });
      else if (href.startsWith("tel:")) trackEvent("phone_clicked", { location: sectionOf(a) });
      else if (/^https?:\/\//.test(href) && !href.includes(window.location.host)) {
        let host = href;
        try {
          host = new URL(href).host.replace(/^www\./, "");
        } catch {}
        trackEvent("outbound_link_clicked", { destination: host, location: sectionOf(a) });
      } else if (href.startsWith("/") || href.startsWith("#")) {
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
      // counts a section as seen once it crosses the middle of the screen, whatever its height
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );
    const observe = () =>
      document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
    observe();
    const t = setTimeout(observe, 1500); // sections that mount late

    const marks = [25, 50, 75, 90, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const m of marks) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          trackEvent("scroll_depth", { percent: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let hiddenAt = 0;
    const onVis = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
        const seconds = Math.round((Date.now() - startRef.current) / 1000);
        trackEvent("page_engagement", {
          seconds_bucket: bucket(seconds),
          max_scroll: Math.max(0, ...hit),
        });
      } else if (hiddenAt) {
        trackEvent("tab_returned", {
          away_seconds_bucket: bucket(Math.round((Date.now() - hiddenAt) / 1000)),
        });
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const onCopy = () => {
      const text = String(window.getSelection() || "").trim();
      if (text)
        trackEvent("text_copied", {
          length: text.length,
          section: sectionOf(window.getSelection()?.anchorNode?.parentElement ?? null),
        });
    };
    document.addEventListener("copy", onCopy);

    return () => {
      const seconds = Math.round((Date.now() - startRef.current) / 1000);
      if (seconds > 1)
        trackEvent("page_engagement", {
          seconds_bucket: bucket(seconds),
          max_scroll: Math.max(0, ...hit),
        });
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
  const label =
    el.getAttribute("aria-label") ||
    el.textContent?.trim().slice(0, 40) ||
    el.tagName.toLowerCase();
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
