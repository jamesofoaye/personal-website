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
    "Lead Frontend & Applied AI Engineer in Abu Dhabi. I build web, mobile and AI products end to end — Verinvo at Oxinus (IHC), Hisab, DrivingInstructor.ae and Dawurobo.",
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
