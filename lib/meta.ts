import type { Metadata } from "next";

/**
 * Search snippets (120–160 characters). The longer `summary` in content.ts
 * is for people reading the page; these are for result pages and link cards.
 */
export const META_DESCRIPTIONS = {
  home: "James Ofori Ayerakwa is a Lead Frontend and Applied AI Engineer in Abu Dhabi. He leads Verinvo's frontend and builds Hisab and DrivingInstructor.ae.",
  about:
    "How a self-taught engineer from Ghana came to lead frontend at Oxinus in Abu Dhabi, how James Ofori works, and answers to the questions people ask him.",
  now: "What James Ofori Ayerakwa is working on this month: Hisab Circle, DrivingInstructor.ae, Dawurobo in Ghana and the Arabic experience at Verinvo.",
  cv: "The CV of James Ofori Ayerakwa, Lead Frontend and Applied AI Engineer in Abu Dhabi: experience since 2020, products he has built, and his skills.",
  verinvo:
    "How James Ofori leads the frontend of Verinvo, a UAE e-invoicing platform, and built its Oxigen MCP server and helped build the Ask Verinvo AI agent.",
  hisab:
    "Hisab is a financial wellness app for the UAE that shows people their debt-free date. See how it was built, including Sawt, its Arabic voice companion.",
  drivinginstructor:
    "DrivingInstructor.ae helps new drivers in Abu Dhabi find a licensed instructor. It gets 5,000+ visitors a month with no ads. Here is how James built it.",
  dawurobo:
    "James Ofori has led engineering at Dawurobo in Ghana since 2021: delivery, bulk SMS, payments and e-commerce, with more than GH₵3M through Hubtel.",
  "oja-studios":
    "OJA Studios is a documentary company James Ofori started in Ghana. Its series The Rise Of has built a YouTube channel with more than 15,000 subscribers.",
  "personal-vpn":
    "Why James Ofori built his own VPN with WireGuard on Google Cloud for his family's phones, and how idle servers sleep to keep the running cost low.",
} as const;

type Key = keyof typeof META_DESCRIPTIONS;

/** Title, description, canonical, Open Graph and Twitter for one page, kept in sync. */
export function pageMeta({
  key,
  title,
  path,
  socialTitle,
  type = "website",
  images = true,
}: {
  key: Key;
  title: string;
  path: string;
  socialTitle?: string;
  type?: "website" | "article" | "profile";
  /** false when the route has its own opengraph-image file */
  images?: boolean;
}): Metadata {
  const description = META_DESCRIPTIONS[key];
  const st = socialTitle ?? `${title} — James Ofori Ayerakwa`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "text/markdown": `${path === "/" ? "/index" : path}.md` },
    },
    openGraph: {
      type,
      title: st,
      description,
      url: path,
      siteName: "James Ofori Ayerakwa",
      locale: "en_GB",
      ...(images ? { images: [{ url: "/opengraph-image", width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: st,
      description,
      creator: "@jamesofoaye",
      ...(images ? { images: ["/twitter-image"] } : {}),
    },
  };
}
