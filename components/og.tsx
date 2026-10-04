/* eslint-disable @next/next/no-img-element */
// Building blocks for Open Graph images (rendered by Satori via next/og).

export const OG_SIZE = { width: 1200, height: 630 };
export const INK = "#0e1017";
export const GOLD = "#e6af2e";

export function LabelBar({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          display: "flex",
          background: INK,
          color: "#fff",
          fontSize: 24,
          fontWeight: 800,
          padding: "12px 28px",
        }}
      >
        {text}
      </div>
      <div
        style={{ display: "flex", width: 16, height: 16, borderRadius: 9999, background: GOLD }}
      />
    </div>
  );
}

export function Phone({
  src,
  width,
  rotate = 0,
  top = 0,
}: {
  src: string;
  width: number;
  rotate?: number;
  top?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        width,
        marginTop: top,
        marginLeft: -18,
        marginRight: -18,
        borderRadius: 30,
        border: `6px solid ${INK}`,
        background: INK,
        overflow: "hidden",
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 24px 48px rgba(14,16,23,0.28)",
      }}
    >
      <img src={src} width={width - 12} style={{ borderRadius: 24 }} alt="" />
    </div>
  );
}

export function Browser({ src, width }: { src: string; width: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width,
        borderRadius: 14,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(14,16,23,0.12)",
        boxShadow: "0 24px 48px rgba(14,16,23,0.22)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          background: "#f7f7f8",
          borderBottom: "1px solid rgba(14,16,23,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#ff5f57",
          }}
        />
        <div
          style={{
            display: "flex",
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#febc2e",
          }}
        />
        <div
          style={{
            display: "flex",
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#28c840",
          }}
        />
      </div>
      <img src={src} width={width} alt="" />
    </div>
  );
}
