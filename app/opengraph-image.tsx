import { ImageResponse } from "next/og";
import { ogAsset, ogFonts } from "@/lib/og-fonts";
import { GOLD, INK, OG_SIZE, Phone } from "@/components/og";

export const alt = "James Ofori Ayerakwa, Lead Frontend and Applied AI Engineer in Abu Dhabi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OgImage() {
  const [hisab, di, dawurobo] = await Promise.all([
    ogAsset("hisab-home.jpg"),
    ogAsset("drivinginstructor-home.jpg"),
    ogAsset("dawurobo-home.jpg"),
  ]);
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
          width: 650,
          padding: "64px 0 56px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, fontWeight: 800 }}>Hello, I&apos;m</span>
          <div style={{ display: "flex", width: 90, height: 5, background: INK, marginTop: 6 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: -5,
              lineHeight: 0.92,
            }}
          >
            James Ofori
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 800,
              marginTop: 26,
              lineHeight: 1.2,
              maxWidth: 560,
            }}
          >
            I build web and mobile products, and the AI features inside them.
          </div>
          <div
            style={{ display: "flex", width: 150, height: 6, background: GOLD, marginTop: 14 }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 22, color: "#4a4d57" }}>
          <span>Lead Frontend &amp; Applied AI Engineer · Abu Dhabi</span>
          <span style={{ marginTop: 4, color: "#676a74" }}>
            Verinvo · Hisab · DrivingInstructor.ae · Dawurobo · jamesofoaye.dev
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          margin: "32px 32px 32px 0",
          borderRadius: 28,
          overflow: "hidden",
          justifyContent: "center",
          background: "linear-gradient(160deg, #fbf3dd 0%, #f7f7f8 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: 110 }}>
          <Phone src={di} width={170} rotate={-7} top={40} />
          <Phone src={hisab} width={200} />
          <Phone src={dawurobo} width={170} rotate={7} top={40} />
        </div>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
