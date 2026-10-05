import type { McpServer } from "@modelcontextprotocol/server";
import { pageMarkdown } from "../markdown";
import { mcpResources, mcpTools } from "./tools";

/** Registers every tool and page resource on an MCP server. */
export function registerSite(server: McpServer) {
  for (const t of mcpTools()) {
    server.registerTool(
      t.name,
      {
        title: t.title,
        description: t.description,
        inputSchema: t.input,
        annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
      },
      async (args: unknown) => ({
        content: [{ type: "text" as const, text: t.run((args ?? {}) as Record<string, unknown>) }],
      }),
    );
  }
  for (const r of mcpResources()) {
    server.registerResource(
      r.name,
      r.uri,
      { title: r.title, description: r.description, mimeType: r.mimeType },
      async (uri) => ({
        contents: [{ uri: uri.href, mimeType: r.mimeType, text: pageMarkdown(r.path) ?? "" }],
      }),
    );
  }
}
