import Link from "next/link";
import { NAV, PERSON } from "@/lib/site";
import { EmailLink } from "./email-link";
import { CurrentYear } from "./current-year";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-3xl text-ink">James Ofori Ayerakwa</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            I&rsquo;m a Lead Frontend and Applied AI Engineer. I live in Abu Dhabi and my roots are
            in Accra, Ghana.
          </p>
          <p className="mt-6 font-mono text-xs tracking-wider text-faint uppercase">
            5.60°N 0.19°W <span className="text-gold">→</span> 24.45°N 54.38°E
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col text-sm">
          <p className="mb-1 font-mono text-xs tracking-wider text-faint uppercase">Site</p>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="w-fit py-3 text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col text-sm">
          <p className="mb-1 font-mono text-xs tracking-wider text-faint uppercase">Elsewhere</p>
          <EmailLink className="w-fit max-w-full py-3 [overflow-wrap:anywhere] text-muted transition-colors hover:text-ink" />
          <a
            href={PERSON.links.linkedin}
            className="w-fit py-3 text-muted transition-colors hover:text-ink"
            rel="me noopener"
            target="_blank"
          >
            LinkedIn ↗
          </a>
          <a
            href={PERSON.links.github}
            className="w-fit py-3 text-muted transition-colors hover:text-ink"
            rel="me noopener"
            target="_blank"
          >
            GitHub ↗
          </a>
          <a
            href={PERSON.links.x}
            className="w-fit py-3 text-muted transition-colors hover:text-ink"
            rel="me noopener"
            target="_blank"
          >
            X ↗
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 pb-8 font-mono text-xs text-faint sm:px-8">
        <span>
          © <CurrentYear /> James Ofori Ayerakwa
        </span>
        <span>
          I designed and built this site myself ·{" "}
          <Link href="/developers" className="underline-offset-4 hover:text-ink hover:underline">
            Developers &amp; MCP
          </Link>{" "}
          ·{" "}
          <Link href="/privacy" className="underline-offset-4 hover:text-ink hover:underline">
            Privacy
          </Link>
        </span>
      </div>
    </footer>
  );
}
