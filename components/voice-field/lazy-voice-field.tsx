"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const VoiceField = dynamic(() => import("./voice-field"), { ssr: false });

/** Loads the WebGL field only when the section is about to scroll into view. */
export function LazyVoiceField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} aria-hidden>
      {show && <VoiceField className="absolute inset-0 animate-[fade-in_1.6s_ease_both]" />}
    </div>
  );
}
