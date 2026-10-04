"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./smooth-scroll";
import { AnalyticsTracker } from "./analytics-tracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <AnalyticsTracker />
      {children}
    </MotionConfig>
  );
}
