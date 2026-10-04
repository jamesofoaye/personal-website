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
      <PageIntro eyebrow={`Now · updated ${UPDATED}`} title="What I’m focused on this month.">
        <p className="mt-6 max-w-xl text-muted">
          A{" "}
          <a
            className="underline decoration-gold underline-offset-4"
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener"
          >
            now page
          </a>
          : a snapshot, not a résumé.
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
