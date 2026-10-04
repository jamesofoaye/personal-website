import { ImageResponse } from "next/og";

export const alt = "James Ofori Ayerakwa — Lead Frontend & Applied AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  // dotted arc motif drawn with plain divs — no external fonts or images needed
  const dots = Array.from({ length: 26 }, (_, i) => {
    const t = i / 25;
    const x = 700 + t * 420;
    const y = 430 - Math.sin(t * Math.PI) * 230;
    return { x, y, s: i === 0 || i === 25 ? 18 : 6 };
  });
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#0e1017",
        padding: 72,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -200,
          top: -150,
          width: 900,
          height: 900,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(230,175,46,0.22), rgba(230,175,46,0) 60%)",
          display: "flex",
        }}
      />
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            borderRadius: 9999,
            background: "#e6af2e",
            opacity: d.s > 6 ? 1 : 0.7,
            display: "flex",
          }}
        />
      ))}
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 4,
          color: "#4a4d57",
          textTransform: "uppercase",
        }}
      >
        Lead Frontend &amp; Applied AI Engineer
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: -3,
            display: "flex",
          }}
        >
          James Ofori
        </div>
        <div style={{ fontSize: 40, color: "#4a4d57", marginTop: 20, display: "flex" }}>
          I build web and mobile products, and the AI inside them.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#676a74" }}>
        Accra → Abu Dhabi · Verinvo · Hisab · DrivingInstructor.ae · Dawurobo
      </div>
    </div>,
    size,
  );
}
