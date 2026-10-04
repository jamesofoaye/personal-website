import { ImageResponse } from "next/og";
import { ogFonts } from "./og-fonts";

/** The brand mark as a PNG: a white J on ink with the gold dot. */
export async function brandIcon(size: number, { rounded = false } = {}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e1017",
        borderRadius: rounded ? size * 0.22 : 0,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "Commissioner",
          fontWeight: 800,
          fontSize: size * 0.62,
          color: "#ffffff",
          letterSpacing: "-0.04em",
          marginTop: size * 0.02,
          marginLeft: -size * 0.08,
        }}
      >
        J
      </div>
      <div
        style={{
          position: "absolute",
          width: size * 0.16,
          height: size * 0.16,
          borderRadius: size,
          background: "#e6af2e",
          right: size * 0.24,
          bottom: size * 0.26,
        }}
      />
    </div>,
    { width: size, height: size, fonts: await ogFonts() },
  );
}
