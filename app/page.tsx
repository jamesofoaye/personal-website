import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { META_DESCRIPTIONS } from "@/lib/meta";
import { profilePageGraph } from "@/lib/structured-data";
import { Hero } from "@/components/home/hero";
import { WorkIndex } from "@/components/home/work-index";
import { AiSection } from "@/components/home/ai-section";
import { Experience, Skills, Archive } from "@/components/home/experience";
import { Contact } from "@/components/home/contact";

export const metadata: Metadata = {
  description: META_DESCRIPTIONS.home,
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
  openGraph: { type: "website", description: META_DESCRIPTIONS.home, url: "/" },
  twitter: { description: META_DESCRIPTIONS.home },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageGraph("/", "James Ofori Ayerakwa")} />
      <Hero />
      <WorkIndex />
      <AiSection />
      <Experience />
      <Skills />
      <Archive />
      <Contact />
    </>
  );
}
