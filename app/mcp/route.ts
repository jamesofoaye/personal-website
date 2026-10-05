import { createMcpHandler } from "mcp-handler";
import { registerSite } from "@/lib/mcp/register";
import { MCP_INSTRUCTIONS, MCP_SERVER_INFO } from "@/lib/mcp/tools";

/**
 * Public, read-only MCP server over Streamable HTTP (stateless).
 * Connect any MCP client to https://jamesofoaye.dev/mcp. No auth needed.
 */
export const dynamic = "force-dynamic";

const handler = createMcpHandler(registerSite, {
  serverInfo: { name: MCP_SERVER_INFO.name, version: MCP_SERVER_INFO.version },
  instructions: MCP_INSTRUCTIONS,
});

export { handler as GET, handler as POST, handler as DELETE };
