import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonJsonLd } from "@/components/json-ld";
import { PERSON, SITE_URL } from "@/lib/site";
import "./globals.css";

// Commissioner, the original site's typeface, self-hosted (variable 100–900).
const commissioner = localFont({
  src: "./fonts/commissioner-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-commissioner",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} — ${PERSON.role}`,
    template: `%s — ${PERSON.shortName}`,
  },
  description: PERSON.description,
  applicationName: PERSON.name,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: PERSON.name,
    locale: "en_GB",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={commissioner.variable}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
        <PersonJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
