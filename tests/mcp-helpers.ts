import { POST, GET } from "@/app/mcp/route";

export const ACCEPT = "application/json, text/event-stream";

/** Sends one JSON-RPC message to the /mcp handler and returns the parsed reply. */
export async function rpc(method: string, params: Record<string, unknown> = {}, id = 1) {
  const res = await POST(
    new Request("https://jamesofoaye.dev/mcp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: ACCEPT,
        "mcp-protocol-version": "2025-06-18",
      },
      body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
    }),
  );
  const text = await res.text();
  const json = res.headers.get("content-type")?.includes("text/event-stream")
    ? JSON.parse(
        text
          .split("\n")
          .filter((l) => l.startsWith("data:"))
          .map((l) => l.slice(5).trim())
          .pop() ?? "{}",
      )
    : JSON.parse(text);
  return { status: res.status, json };
}

export { GET };
