"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The pages are pre-rendered at build time, so a server-side
 * `new Date().getFullYear()` would freeze the year until the next deploy.
 * This reads the year in the visitor's browser instead, so it rolls over
 * on 1 January without a rebuild. The server value is only a fallback.
 */
export function CurrentYear() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => new Date().getFullYear(),
  );
}
