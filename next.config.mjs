import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Pages have a Markdown version for agents (see proxy.ts), so caches must key on Accept.
  async headers() {
    return [{ source: "/((?!_next/).*)", headers: [{ key: "Vary", value: "Accept" }] }];
  },
};

export default createMDX({})(nextConfig);
