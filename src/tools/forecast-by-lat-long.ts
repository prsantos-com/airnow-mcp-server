import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as airnowApi from "../airnow-api.js";

export const registerForecastByLatLong = (server: McpServer): void => {
  server.tool(
    "get-forecast-by-lat-long",
    "Get current or historical forecasted AQI values and categories for a reporting area by latitude and longitude.",
    {
      latitude: z
        .string()
        .describe("Latitude in decimal degrees. Example: 38.33"),
      longitude: z
        .string()
        .describe("Longitude in decimal degrees. Example: -122.28"),
      date: z
        .string()
        .optional()
        .describe("Date of forecast. Format: YYYY-MM-DD. Example: 2012-02-01"),
      format: z
        .enum(["text/csv", "application/json", "application/xml"])
        .describe(
          "Format of the payload file returned. Example: application/json"
        ),
      distance: z
        .string()
        .optional()
        .describe(
          "Return a forecast from a nearby reporting area within this distance (in miles). Example: 150"
        ),
    },
    async (params) => {
      const result = await airnowApi.fetchForecastByLatLong(params);
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
};
