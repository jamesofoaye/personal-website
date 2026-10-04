import Link from "next/link";
import { NAV, PERSON } from "@/lib/site";
import { EmailLink } from "./email-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-ink">James Ofori Ayerakwa</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            I&rsquo;m a Lead Frontend and Applied AI Engineer. I live in Abu Dhabi and my roots are
            in Accra, Ghana.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-wider text-faint uppercase">
            5.60°N 0.19°W <span className="text-gold">→</span> 24.45°N 54.38°E
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          <p className="mb-2 font-mono text-[11px] tracking-wider text-faint uppercase">Site</p>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="w-fit text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-2 font-mono text-[11px] tracking-wider text-faint uppercase">
            Elsewhere
          </p>
          <EmailLink className="w-fit text-muted transition-colors hover:text-ink" />
          <a
            href={PERSON.links.linkedin}
            className="w-fit text-muted transition-colors hover:text-ink"
            rel="me noopener"
            target="_blank"
          >
            LinkedIn ↗
          </a>
          <a
            href={PERSON.links.github}
            className="w-fit text-muted transition-colors hover:text-ink"
            rel="me noopener"
            target="_blank"
          >
            GitHub ↗
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 pb-8 font-mono text-[11px] text-faint sm:px-8">
        <span>© {new Date().getFullYear()} James Ofori Ayerakwa</span>
        <span>I designed and built this site myself.</span>
      </div>
    </footer>
  );
}
