"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type EventValue } from "@/lib/analytics";

type EventProps = Record<string, EventValue>;

/** Fires an event once when the user scrolls this container sideways. */
export function TrackHorizontalScroll({
  event,
  props,
  className,
  children,
}: {
  event: string;
  props?: EventProps;
  className?: string;
  children: React.ReactNode;
}) {
  const fired = useRef(false);
  return (
    <div
      className={className}
      onScroll={(e) => {
        if (fired.current || (e.currentTarget as HTMLDivElement).scrollLeft < 40) return;
        fired.current = true;
        trackEvent(event, props);
      }}
    >
      {children}
    </div>
  );
}

/** Fires an event once when this component mounts (e.g. a 404 page). */
export function TrackOnMount({ event, props }: { event: string; props?: EventProps }) {
  useEffect(() => {
    trackEvent(event, { ...props, referrer: document.referrer ? new URL(document.referrer).host : "direct" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
