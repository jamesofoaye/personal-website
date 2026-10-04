"use client";

import { useState, useSyncExternalStore } from "react";
import { PERSON } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const subscribe = () => () => {};
const address = () => PERSON.emailParts.join("@");

/**
 * The address is assembled on the client only, so it never appears in the
 * server-rendered HTML that scrapers read.
 */
export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <a
      href={
        mounted
          ? `mailto:${address()}?subject=${encodeURIComponent("Hello from your website")}`
          : "#contact"
      }
      className={className}
    >
      {children ?? (mounted ? address() : "Email me")}
    </a>
  );
}

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(address());
          setCopied(true);
          trackEvent("email_copied");
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.location.href = `mailto:${address()}`;
        }
      }}
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
    </button>
  );
}
