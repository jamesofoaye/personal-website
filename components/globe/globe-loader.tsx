"use client";

import dynamic from "next/dynamic";

// three.js stays out of the server bundle and the critical path.
const Globe = dynamic(() => import("./globe"), {
  ssr: false,
  loading: () => <div className="size-full" aria-hidden />,
});

export function GlobeLoader({ className }: { className?: string }) {
  return <Globe className={className} />;
}
