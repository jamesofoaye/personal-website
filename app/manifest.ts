import type { MetadataRoute } from "next";
import { PERSON } from "@/lib/site";
import { META_DESCRIPTIONS } from "@/lib/meta";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PERSON.name,
    short_name: "James Ofori",
    description: META_DESCRIPTIONS.home,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icons/192.png", type: "image/png", sizes: "192x192" },
      { src: "/icons/512.png", type: "image/png", sizes: "512x512", purpose: "any" },
    ],
  };
}
