#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { registerTools } from "./tools/index.js";
import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

logger.info(`Starting airnow-mcp-server v${packageJson.version}`);

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
logger.info("Registered tools.");

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info("Server connected and running.");
}

main().catch((error: unknown) => {
  // logger.error(`Server error: ${error instanceof Error ? error.stack : error}`);
  process.exit(1);
});
