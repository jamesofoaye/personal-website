import type { MetadataRoute } from "next";
import { VENTURES } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

// Bump when the content changes meaningfully.
const UPDATED = new Date("2026-10-04");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: UPDATED, changeFrequency: "monthly", priority: 1 },
    ...VENTURES.map((v) => ({
      url: `${SITE_URL}/work/${v.slug}`,
      lastModified: UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: v.shots.map((s) => `${SITE_URL}${s.src}`),
    })),
    { url: `${SITE_URL}/about`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/now`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/cv`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${SITE_URL}/developers`,
      lastModified: UPDATED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    { url: `${SITE_URL}/privacy`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.2 },
  ];
}
