import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
};

export default createMDX({})(nextConfig);
