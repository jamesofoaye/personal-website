/**
 * Product analytics on Vercel Web Analytics (Pro plan).
 *
 * Pro keeps 2 properties per custom event, so every event is designed around
 * two: the thing that happened, plus `device` (mobile, tablet or desktop),
 * because most visitors are expected on phones. Events are billed per event,
 * so continuous signals (scroll, time) are bucketed and fired once per page.
 *
 * Names are snake_case: noun + past-tense verb, e.g. `project_opened`.
 */
import { track } from "@vercel/analytics";

export type EventValue = string | number | boolean | null;

export function device(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

/**
 * Sends one event. Pass the most important property first; if you pass only
 * one, `device` is added as the second.
 */
export function trackEvent(name: string, props: Record<string, EventValue> = {}) {
  if (typeof window === "undefined") return;
  const entries = Object.entries(props).slice(0, 2);
  if (entries.length < 2) entries.push(["device", device()]);
  try {
    track(name, Object.fromEntries(entries));
  } catch {
    /* analytics must never break the page */
  }
  if (process.env.NODE_ENV === "development") console.debug("[track]", name, Object.fromEntries(entries));
}
