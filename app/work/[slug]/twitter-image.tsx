import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";
import { VENTURES } from "@/lib/content";

export const alt = "A project by James Ofori Ayerakwa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return VENTURES.map((v) => ({ slug: v.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VENTURES.find((x) => x.slug === slug) ?? VENTURES[0]!;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        fontFamily: "Commissioner",
        fontWeight: 500,
        color: "#0e1017",
        padding: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            background: "#0e1017",
            color: "#fff",
            fontSize: 26,
            padding: "14px 32px",
            fontWeight: 800,
          }}
        >
          {v.kind}
        </div>
        <div
          style={{
            display: "flex",
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: "#e6af2e",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
            backgroundImage: `linear-gradient(to right, ${v.gradient[0]}, ${v.gradient[1]})`,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {v.name}
        </div>
        <div
          style={{ display: "flex", fontSize: 38, color: "#4a4d57", marginTop: 24, maxWidth: 980 }}
        >
          {v.tagline}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#676a74" }}
      >
        <span>James Ofori Ayerakwa</span>
        <span>{v.role}</span>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
