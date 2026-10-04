/**
 * schema.org structured data. Everything shares stable @ids so search engines
 * and AI answer engines can join the person, the site and each project into
 * one graph.
 */
import { VENTURES, type Venture } from "./content";
import { FAQ } from "./faq";
import { PERSON, SITE_URL } from "./site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
/** Bump with content changes; used as dateModified. */
export const CONTENT_UPDATED = "2026-10-04";
const orgId = (v: Venture) => `${SITE_URL}/#org-${v.slug}`;
const isFounded = (v: Venture) => /founder/i.test(v.role);

const orgRef = (v: Venture) => ({
  "@type": "Organization",
  "@id": orgId(v),
  name: v.name,
  ...(v.url ? { url: v.url } : {}),
  ...(isFounded(v) ? { founder: { "@id": PERSON_ID } } : {}),
});

export function personNode() {
  const founded = VENTURES.filter(isFounded).map(orgRef);
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
    sameAs: [PERSON.links.linkedin, PERSON.links.github, PERSON.links.x],
    mainEntityOfPage: `${SITE_URL}/about`,
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
        dateModified: CONTENT_UPDATED,
      },
      {
        "@type": "ItemList",
        name: "Projects by James Ofori Ayerakwa",
        itemListElement: VENTURES.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/work/${v.slug}`,
          name: v.name,
        })),
      },
    ],
  };
}

export function caseStudyGraph(v: Venture) {
  const url = `${SITE_URL}/work/${v.slug}`;
  const isVideo = v.slug === "oja-studios";
  const app: Record<string, [string, string, string]> = {
    hisab: ["MobileApplication", "FinanceApplication", "iOS, Android"],
    dawurobo: ["MobileApplication", "BusinessApplication", "iOS, Android, Web"],
    "personal-vpn": ["MobileApplication", "UtilitiesApplication", "Android"],
    verinvo: ["WebApplication", "BusinessApplication", "Web"],
    drivinginstructor: ["WebApplication", "EducationalApplication", "Web"],
  };
  const [type, category, os] = app[v.slug] ?? ["SoftwareApplication", "BusinessApplication", "Web"];
  const subject = isVideo
    ? orgRef(v)
    : {
        "@type": type,
        name: v.name,
        ...(v.url ? { url: v.url } : {}),
        description: v.tagline,
        applicationCategory: category,
        operatingSystem: os,
        creator: { "@id": PERSON_ID },
        ...(isFounded(v) ? { publisher: { "@id": orgId(v) } } : {}),
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
        publisher: { "@id": PERSON_ID },
        mainEntityOfPage: url,
        dateModified: CONTENT_UPDATED,
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
          { "@type": "ListItem", position: 2, name: v.name, item: url },
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
