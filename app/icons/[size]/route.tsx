import { brandIcon } from "@/lib/brand-icon";

export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ size: "192.png" }, { size: "512.png" }];
}

export async function GET(_: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const n = size === "512.png" ? 512 : 192;
  return brandIcon(n);
}
