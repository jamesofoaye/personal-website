import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PRIVACY, PRIVACY_UPDATED } from "@/lib/privacy";
import { EmailLink } from "@/components/email-link";
import { PERSON } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How jamesofoaye.dev handles your data: no cookies, no accounts and no ads, only anonymous Vercel Web Analytics and Speed Insights to keep the site useful and fast.",
  alternates: { canonical: "/privacy", types: { "text/markdown": "/privacy.md" } },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow={`Privacy · updated ${PRIVACY_UPDATED}`} title="What this site collects.">
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
          This site collects very little, and this page lists all of it.
        </p>
      </PageIntro>
      <div data-section="privacy" className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {PRIVACY.map((s) => (
          <section key={s.title} className="border-t border-line py-10">
            <h2 className="font-display text-3xl text-ink">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </section>
        ))}
        <p className="border-t border-line pt-10 text-muted">
          <EmailLink className="text-ink underline decoration-gold decoration-2 underline-offset-4">
            Email me
          </EmailLink>{" "}
          or message me on{" "}
          <a
            href={PERSON.links.linkedin}
            target="_blank"
            rel="noopener"
            className="text-ink underline decoration-gold decoration-2 underline-offset-4"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </>
  );
}
