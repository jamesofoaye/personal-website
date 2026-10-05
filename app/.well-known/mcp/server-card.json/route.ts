import { serverCard } from "@/lib/mcp/card";

export const dynamic = "force-static";

export function GET() {
  return Response.json(serverCard(), {
    headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" },
  });
}
