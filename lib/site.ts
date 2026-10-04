/**
 * Site-wide constants. The base URL comes from NEXT_PUBLIC_SITE_URL so moving
 * domains is a Vercel env change, not a code change.
 */
const FALLBACK_URL = "https://jamesofoaye.dev";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/$/, "");

export const PERSON = {
  name: "James Ofori Ayerakwa",
  shortName: "James Ofori",
  role: "Lead Frontend & Applied AI Engineer",
  location: "Abu Dhabi, UAE",
  origin: "Ghana",
  description:
    "I'm James Ofori Ayerakwa, a Lead Frontend and Applied AI Engineer in Abu Dhabi. I lead the frontend of Verinvo at Oxinus (IHC) and build my own products, including Hisab and DrivingInstructor.ae.",
  // Email is split so it never sits in the HTML as a scrapeable string.
  emailParts: ["jamesofoaye", "gmail.com"] as const,
  links: {
    linkedin: "https://www.linkedin.com/in/jamesofoaye",
    github: "https://github.com/jamesofoaye",
  },
} as const;

export const NAV = [
  { label: "Work", href: "/#work" },
  { label: "AI", href: "/#ai" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "CV", href: "/cv" },
] as const;
