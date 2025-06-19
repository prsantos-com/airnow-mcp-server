import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as airnowApi from "../airnow-api.js";

export const registerCurrentObservationsByZipCode = (server: McpServer): void => {
  server.tool(
    "get-current-observations-by-reporting-area-by-zip-code",
    "Get current AQI values and categories for a reporting area by Zip code.",
    {
      zipCode: z
        .string()
        .describe(
          "Zip code to get the current observations for. Example: 94954"
        ),
      format: z
        .enum(["text/csv", "application/json", "application/xml"])
        .describe(
          "Format of the payload file returned. Example: application/json"
        ),
      distance: z
        .string()
        .optional()
        .describe(
          "If no reporting area is associated with the Zip code, current observations from a nearby reporting area within this distance (in miles) will be returned, if available. Example: 150"
        ),
    },
    async (params) => {
      const result =
        await airnowApi.fetchCurrentObservationsByReportingAreaByZipCode(
          params
        );
      if (result === null) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch current observations data from AirNow API.",
            },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    }
  );
};
