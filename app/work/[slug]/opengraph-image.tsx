import { ImageResponse } from "next/og";
import { VENTURES } from "@/lib/content";
import { ogAsset, ogFonts } from "@/lib/og-fonts";
import { Browser, INK, LabelBar, OG_SIZE, Phone } from "@/components/og";

export const alt = "A project by James Ofori Ayerakwa";
export const size = OG_SIZE;
export const contentType = "image/png";

const SHOTS: Record<string, string[]> = {
  verinvo: ["verinvo-mcp.jpg"],
  hisab: ["hisab-coach.jpg", "hisab-home.jpg"],
  drivinginstructor: ["drivinginstructor-license-check.jpg", "drivinginstructor-home.jpg"],
  dawurobo: ["dawurobo-shop.jpg", "dawurobo-home.jpg"],
  "oja-studios": ["oja-studios-channel.jpg"],
};

export function generateStaticParams() {
  return VENTURES.map((v) => ({ slug: v.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VENTURES.find((x) => x.slug === slug) ?? VENTURES[0]!;
  const files = SHOTS[v.slug] ?? [];
  const shots = await Promise.all(files.map(ogAsset));
  const [a, b] = v.gradient;
  const long = v.name.length > 12;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        color: INK,
        fontFamily: "Commissioner",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 640,
          padding: "64px 0 56px 64px",
        }}
      >
        <LabelBar text={v.kind} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: long ? 62 : 104,
              fontWeight: 800,
              letterSpacing: long ? -2 : -4,
              lineHeight: 1,
              color: a,
            }}
          >
            {v.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.3,
              color: "#4a4d57",
              marginTop: 22,
              maxWidth: 540,
            }}
          >
            {v.tagline}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 22, color: "#676a74" }}>
          <span style={{ color: INK, fontWeight: 800 }}>James Ofori Ayerakwa</span>
          <span style={{ marginTop: 4 }}>{v.role.split(" · ")[0]} · jamesofoaye.dev</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          margin: "32px 32px 32px 0",
          borderRadius: 28,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          background: shots.length
            ? `linear-gradient(135deg, ${a}26 0%, ${b}38 100%)`
            : `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
        }}
      >
        {v.slug === "verinvo" && shots[0] ? (
          <Browser src={shots[0]} width={470} />
        ) : shots.length === 2 ? (
          <div style={{ display: "flex", alignItems: "flex-start", marginTop: 90 }}>
            <Phone src={shots[0]!} width={220} rotate={-5} top={30} />
            <Phone src={shots[1]!} width={240} rotate={4} />
          </div>
        ) : shots.length === 1 ? (
          <div style={{ display: "flex", marginTop: 170 }}>
            <Phone src={shots[0]!} width={260} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", color: "#fff", padding: 48 }}>
            {v.metrics.map((m) => (
              <div
                key={m.label}
                style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 14 }}
              >
                <span style={{ fontSize: 64, fontWeight: 800 }}>{m.value}</span>
                <span style={{ fontSize: 22, opacity: 0.8, maxWidth: 280 }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
