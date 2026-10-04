/**
 * One place to send product analytics.
 *
 * - Vercel Web Analytics custom events are always on (part of the Vercel plan).
 *   Vercel keeps a small number of properties per event, so only the first two
 *   are sent there.
 * - PostHog is optional: set NEXT_PUBLIC_POSTHOG_KEY (and NEXT_PUBLIC_POSTHOG_HOST
 *   if not EU cloud) and every event goes there too, with all properties,
 *   plus pageviews, session replay and heatmaps. PostHog is loaded lazily so it
 *   never slows the first paint.
 *
 * Event names are snake_case nouns + past-tense verbs, e.g. `project_opened`.
 */
import { track as vercelTrack } from "@vercel/analytics";

export type EventProps = Record<string, string | number | boolean | null>;

type PostHogLike = { capture: (e: string, p?: Record<string, unknown>) => void };
let posthog: PostHogLike | null = null;
const queue: [string, EventProps][] = [];

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

export function setPostHog(client: PostHogLike) {
  posthog = client;
  while (queue.length) {
    const [e, p] = queue.shift()!;
    client.capture(e, p);
  }
}

export function trackEvent(name: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  const enriched: EventProps = {
    ...props,
    path: window.location.pathname,
    viewport: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
  };
  try {
    const first2 = Object.fromEntries(Object.entries(props).slice(0, 2));
    vercelTrack(name, first2);
  } catch {
    /* analytics must never break the page */
  }
  if (POSTHOG_KEY) {
    if (posthog) posthog.capture(name, enriched);
    else if (queue.length < 100) queue.push([name, enriched]);
  }
  if (process.env.NODE_ENV === "development") console.debug("[track]", name, enriched);
}
