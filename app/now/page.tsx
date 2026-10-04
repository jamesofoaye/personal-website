import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Now",
  description: "What James Ofori is focused on this month.",
  alternates: { canonical: "/now" },
};

// Update this date whenever content.mdx changes.
const UPDATED = "October 2026";

export default function NowPage() {
  return (
    <>
      <PageIntro eyebrow={`Now · updated ${UPDATED}`} title="What I am working on this month.">
        <p className="mt-6 max-w-xl text-lg text-muted">
          This page shows what I am working on right now. I update it at the start of every month.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 pb-32 sm:px-8">
        <div className="prose-site max-w-2xl md:ms-[33%]">
          <Content />
        </div>
      </div>
    </>
  );
}
