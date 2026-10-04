// Generates public/globe/land.bin: Int16 pairs (lat*100, lon*100) of evenly
// spaced points that fall on land. Run with `npm run globe:data`.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(await readFile(new URL("../node_modules/world-atlas/land-110m.json", import.meta.url)));
const land = feature(topo, topo.objects.land);

const SAMPLES = 52000;
const golden = Math.PI * (3 - Math.sqrt(5));
const out = [];
for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2;
  const theta = golden * i;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((theta * 180) / Math.PI) % 360) + 540) % 360 - 180;
  if (lat < -60) continue; // skip Antarctica, keeps the globe readable
  if (geoContains(land, [lon, lat])) out.push(Math.round(lat * 100), Math.round(lon * 100));
}
await mkdir(new URL("../public/globe/", import.meta.url), { recursive: true });
await writeFile(new URL("../public/globe/land.bin", import.meta.url), Buffer.from(new Int16Array(out).buffer));
console.log(`${out.length / 2} land points`);
