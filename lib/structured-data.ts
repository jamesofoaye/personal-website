/**
 * schema.org structured data. Everything shares stable @ids so search engines
 * and AI answer engines can join the person, the site and each project into
 * one graph.
 */
import { ARCHIVE, VENTURES, type Venture } from "./content";
import { FAQ } from "./faq";
import { PERSON, SITE_URL } from "./site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const orgRef = (v: Venture) =>
  v.url
    ? { "@type": "Organization", name: v.name, url: v.url }
    : { "@type": "Organization", name: v.name };

export function personNode() {
  const founded = VENTURES.filter((v) => /founder/i.test(v.role)).map(orgRef);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    givenName: "James",
    familyName: "Ofori Ayerakwa",
    alternateName: ["James Ofori", "jamesofoaye"],
    jobTitle: PERSON.role,
    description: PERSON.description,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    worksFor: {
      "@type": "Organization",
      name: "Oxinus Holdings",
      parentOrganization: { "@type": "Organization", name: "International Holding Company (IHC)" },
    },
    affiliation: [
      { "@type": "Organization", name: "Dawurobo", url: "https://dawurobo.com" },
      ...founded,
    ],
    homeLocation: { "@type": "Place", name: "Abu Dhabi, United Arab Emirates" },
    nationality: { "@type": "Country", name: "Ghana" },
    knowsLanguage: ["English"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Google IT Support Professional Certificate",
      },
      { "@type": "EducationalOccupationalCredential", name: "Andela React Learning Program" },
    ],
    knowsAbout: [
      "Frontend engineering",
      "Applied AI engineering",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Model Context Protocol (MCP)",
      "AI agents",
      "Voice AI",
      "E-invoicing",
      "Payments",
      "Right-to-left and Arabic interfaces",
      "Technical SEO",
    ],
    sameAs: [PERSON.links.linkedin, PERSON.links.github],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: PERSON.name,
    description: PERSON.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function siteGraph() {
  return { "@context": "https://schema.org", "@graph": [personNode(), websiteNode()] };
}

export function profilePageGraph(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}${path}#page`,
        url: `${SITE_URL}${path}`,
        name,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        name: "Projects by James Ofori Ayerakwa",
        itemListElement: [
          ...VENTURES.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/work/${v.slug}`,
            name: v.name,
          })),
          ...ARCHIVE.map((a, i) => ({
            "@type": "ListItem",
            position: VENTURES.length + i + 1,
            url: a.url,
            name: a.name,
          })),
        ],
      },
    ],
  };
}

export function caseStudyGraph(v: Venture) {
  const url = `${SITE_URL}/work/${v.slug}`;
  const isApp = ["hisab", "dawurobo"].includes(v.slug);
  const isVideo = v.slug === "oja-studios";
  const subject = isVideo
    ? { "@type": "Organization", name: v.name, url: v.url, founder: { "@id": PERSON_ID } }
    : {
        "@type": isApp ? "MobileApplication" : "SoftwareApplication",
        name: v.name,
        url: v.url,
        description: v.summary,
        applicationCategory: isApp ? "FinanceApplication" : "BusinessApplication",
        operatingSystem: isApp ? "iOS, Android" : "Web",
        ...(v.shots[0] ? { screenshot: `${SITE_URL}${v.shots[0].src}` } : {}),
      };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        url,
        name: `${v.name}: ${v.kind}`,
        headline: v.tagline,
        description: v.summary,
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: subject,
        keywords: v.stack.join(", "),
        ...(v.shots[0] ? { image: `${SITE_URL}${v.shots[0].src}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
          { "@type": "ListItem", position: 3, name: v.name, item: url },
        ],
      },
    ],
  };
}

export function faqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
