import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as airnowApi from "../airnow-api.js";

export const registerContourMapsByBoundingBoxOzone = (server: McpServer): void => {
  server.tool(
    "get-contour-maps-by-geographic-bounding-box-ozone",
    "Get current or historical Ozone contour maps in KML by geographic bounding box.",
    {
      date: z
        .string()
        .describe(
          "The date and hour of the data (in UTC). Time represents the beginning of the measurement period. Format: yyyy-mm-ddTHH. Example: January 1, 2012 at 1PM would be formatted as: 2012-01-01T13 and represents data measured between 1:00 PM-1:59 PM UTC"
        ),
      bbox: z
        .string()
        .describe(
          "Geographic bounding box of the area of interest in latitude and longitude. Format: minX,minY,maxX,maxY. Example: -118,34,-71,42"
        ),
      srs: z
        .string()
        .describe(
          "The coordinate system of the bounding box. Format: The well-known text or EPSG code. Default: EPSG:4326. Example: EPSG:4326"
        ),
    },
    async (params) => {
      const result =
        await airnowApi.fetchContourMapsByGeographicBoundingBoxOzone(params);
      if (result === null) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch contour maps data from AirNow API.",
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
