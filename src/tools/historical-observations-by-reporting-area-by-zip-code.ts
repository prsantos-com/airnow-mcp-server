import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as airnowApi from "../airnow-api.js";

export const registerHistoricalObservationsByZipCode = (server: McpServer): void => {
  server.tool(
    "get-historical-observations-by-reporting-area-by-zip-code",
    "Get historical AQI values and categories for a reporting area by Zip code.",
    {
      zipCode: z
        .string()
        .describe(
          "Zip code to get the historical observations for. Example: 94954"
        ),
      date: z
        .string()
        .describe(
          "Date to get the historical observations for. Format: YYYY-MM-DD. Example: 2012-02-01"
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
          "If no reporting area is associated with the Zip code, historical observations from a nearby reporting area within this distance (in miles) will be returned, if available. Example: 150"
        ),
    },
    async (params) => {
      const result =
        await airnowApi.fetchHistoricalObservationsByReportingAreaByZipCode(
          params
        );
      if (result === null) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch historical observations data from AirNow API.",
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
