import { describe, expect, it } from "vitest";
import { serverCard } from "@/lib/mcp/card";
import { GET as cardRoute } from "@/app/.well-known/mcp/server-card.json/route";
import { GET as mirrorRoute } from "@/app/.well-known/mcp.json/route";
import { rpc } from "./mcp-helpers";

describe("MCP server card (SEP-1649)", () => {
  it("has the required fields and points at the Streamable HTTP endpoint", () => {
    const card = serverCard();
    expect(card.$schema).toBe(
      "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    );
    expect(card.version).toBe("1.0");
    expect(card.protocolVersion).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(card.serverInfo).toMatchObject({ name: "jamesofoaye", version: "1.0.0" });
    expect(card.transport).toEqual({ type: "streamable-http", endpoint: "/mcp" });
    expect(card.remotes[0]).toEqual({
      type: "streamable-http",
      url: "https://jamesofoaye.dev/mcp",
    });
  });

  it("declares the same capabilities as the live server", async () => {
    const { json } = await rpc("initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "test", version: "1.0.0" },
    });
    expect(serverCard().capabilities).toEqual(json.result.capabilities);
  });

  it("lists exactly the tools the live server lists, with JSON Schema inputs", async () => {
    const card = serverCard();
    const { json } = await rpc("tools/list");
    const live = (json.result.tools as { name: string }[]).map((t) => t.name).sort();
    expect(card.tools.map((t) => t.name).sort()).toEqual(live);
    for (const t of card.tools) {
      expect(t.inputSchema.type).toBe("object");
      expect(t.inputSchema).not.toHaveProperty("$schema");
    }
  });

  it("is served as JSON at both well-known paths", async () => {
    for (const route of [cardRoute, mirrorRoute]) {
      const res = route();
      expect(res.headers.get("content-type")).toMatch(/application\/json/);
      expect(res.headers.get("access-control-allow-origin")).toBe("*");
      expect((await res.json()).serverInfo.name).toBe("jamesofoaye");
    }
  });
});
