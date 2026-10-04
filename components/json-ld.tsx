import { PERSON, SITE_URL } from "@/lib/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    alternateName: "James Ofori",
    jobTitle: PERSON.role,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    worksFor: { "@type": "Organization", name: "Oxinus Holdings" },
    homeLocation: { "@type": "Place", name: PERSON.location },
    nationality: { "@type": "Country", name: "Ghana" },
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Applied AI",
      "Model Context Protocol",
      "E-invoicing",
    ],
    knowsLanguage: ["en"],
    sameAs: [PERSON.links.linkedin, PERSON.links.github],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
