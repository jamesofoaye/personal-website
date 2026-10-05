import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { PageIntro } from "@/components/page-intro";
import { CLIENT_SETUP, DEV_INTRO, MACHINE_FILES, toolList } from "@/lib/developers";

export const metadata: Metadata = pageMeta({
  key: "developers",
  title: "Developer resources and MCP server",
  path: "/developers",
  socialTitle: "jamesofoaye developer resources: MCP server, llms.txt and Markdown",
});

export default function DevelopersPage() {
  return (
    <>
      <PageIntro eyebrow="For developers and agents" title="Developer resources and MCP server.">
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{DEV_INTRO}</p>
      </PageIntro>

      <div data-section="developers" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <section className="border-t border-line py-10">
          <h2 className="font-display text-3xl text-ink">Connect to the MCP server</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            The server uses Streamable HTTP and only reads public information from this site. It
            never returns a phone number or address, and it points people to the contact section for
            email.
          </p>
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6">
            {CLIENT_SETUP.map((c) => (
              <div key={c.client} className="min-w-0">
                <h3 className="text-lg font-semibold text-ink">{c.client}</h3>
                <p className="mt-1 text-muted">{c.how}</p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-[#0e1017] p-4 text-sm leading-relaxed text-[#f3f1ea]">
                  <code>{c.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-line py-10">
          <h2 className="font-display text-3xl text-ink">Tools</h2>
          <dl className="mt-6 grid gap-5">
            {toolList().map((t) => (
              <div key={t.name} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-mono text-sm text-ink">{t.name}</dt>
                <dd className="text-muted">{t.description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-muted">
            Every page is also exposed as an MCP resource in Markdown.
          </p>
        </section>

        <section className="border-t border-line py-10">
          <h2 className="font-display text-3xl text-ink">Machine-readable files</h2>
          <ul className="mt-6 grid gap-5">
            {MACHINE_FILES.map((f) => (
              <li key={f.name}>
                <a
                  href={f.url}
                  className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4 [overflow-wrap:anywhere]"
                >
                  {f.name}
                </a>
                <p className="mt-1 text-muted">{f.what}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
