"use client";

import { trackEvent } from "@/lib/analytics";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("cv_saved_as_pdf");
        window.print();
      }}
      className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95 print:hidden"
    >
      Save as PDF
    </button>
  );
}
