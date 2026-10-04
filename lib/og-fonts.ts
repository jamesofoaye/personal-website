import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Commissioner for OG images (Satori needs woff/ttf, not woff2). */
export async function ogFonts() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/og-commissioner-800.woff")),
    readFile(join(process.cwd(), "app/fonts/og-commissioner-500.woff")),
  ]);
  return [
    { name: "Commissioner", data: bold, weight: 800 as const, style: "normal" as const },
    { name: "Commissioner", data: regular, weight: 500 as const, style: "normal" as const },
  ];
}
