import { LATEST_PROTOCOL_VERSION } from "@modelcontextprotocol/server";
import { z } from "zod";
import { SITE_URL } from "../site";
import { MCP_INSTRUCTIONS, MCP_SERVER_INFO, mcpResources, mcpTools } from "./tools";

export const MCP_ENDPOINT = "/mcp";

/**
 * MCP Server Card (SEP-1649), served at /.well-known/mcp/server-card.json and
 * mirrored at /.well-known/mcp.json, so clients can discover the server
 * without connecting first.
 */
export function serverCard() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: LATEST_PROTOCOL_VERSION,
    serverInfo: { ...MCP_SERVER_INFO },
    description:
      "Read-only facts about James Ofori Ayerakwa (jamesofoaye) and the products he has built.",
    documentationUrl: `${SITE_URL}/developers`,
    instructions: MCP_INSTRUCTIONS,
    transport: { type: "streamable-http", endpoint: MCP_ENDPOINT },
    remotes: [{ type: "streamable-http", url: `${SITE_URL}${MCP_ENDPOINT}` }],
    authentication: { required: false, schemes: [] },
    capabilities: { tools: { listChanged: true }, resources: { listChanged: true } },
    tools: mcpTools().map((t) => {
      const { $schema: _ignored, ...inputSchema } = z.toJSONSchema(t.input) as Record<
        string,
        unknown
      >;
      void _ignored;
      return {
        name: t.name,
        title: t.title,
        description: t.description,
        inputSchema,
        annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
      };
    }),
    resources: mcpResources().map(({ path: _p, ...r }) => (void _p, r)),
    prompts: [],
    _meta: {},
  };
}
