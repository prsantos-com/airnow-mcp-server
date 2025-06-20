#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { registerTools } from "./tools/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

export const server = new McpServer(
  {
    name: "airnow-mcp-server",
    version: packageJson.version,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

registerTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server connected and running.");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
