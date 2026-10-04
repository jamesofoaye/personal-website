"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  );
}
