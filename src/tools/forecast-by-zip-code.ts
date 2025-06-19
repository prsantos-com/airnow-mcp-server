import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as airnowApi from "../airnow-api.js";

export const registerForecastByZipCode = (server: McpServer): void => {
  server.tool(
    "get-forecast-by-zip-code",
    "Get current or historical forecasted AQI values and categories for a reporting area by Zip code.",
    {
      zipCode: z
        .string()
        .describe("Zip code to get the forecast for. Example: 94954"),
      date: z
        .string()
        .optional()
        .describe(
          "Date to get the forecast for. Format: YYYY-MM-DD. Example: 2012-02-01"
        ),
      format: z
        .enum(["text/csv", "application/json", "application/xml"])
        .describe(
          "Format of the payload file returned. Example: application/json"
        ),
      distance: z
        .string()
        .optional()
        .describe("Distance in miles to search for the forecast. Example: 150"),
    },
    async (params) => {
      const result = await airnowApi.fetchForecastByZipCode(params);
      if (result === null) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch forecast data from AirNow API.",
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
}
