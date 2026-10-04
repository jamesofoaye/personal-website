"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js stays out of the server bundle and the critical path.
const Globe = dynamic(() => import("./globe"), {
  ssr: false,
  loading: () => <div className="size-full" aria-hidden />,
});

/** Waits until the browser is idle after first paint, so the hero text and LCP come first. */
export function GlobeLoader({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(go, 300);
    return () => clearTimeout(t);
  }, []);
  return ready ? <Globe className={className} /> : <div className={className} aria-hidden />;
}
