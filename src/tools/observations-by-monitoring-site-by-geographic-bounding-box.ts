import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as airnowApi from "../airnow-api.js";

export const registerObservationsByBoundingBox = (server: McpServer): void => {
  server.tool(
    "get-observations-by-monitoring-site-by-geographic-bounding-box",
    "Get observations by monitoring site within a geographic bounding box.",
    {
      bbox: z
        .string()
        .describe(
          "Geographic bounding box of the area of interest in latitude and longitude. The format is a comma separated list minX,minY,maxX,maxY. Example: 122.715607,38.181254,-120.012970,39.022646"
        ),
      parameters: z
        .string()
        .describe(
          "Comma separated list of pollutant parameters short codes to return data for. Options include: ozone, pm25, pm10, co, no2, so2. Example: ozone,pm25"
        ),
      datatype: z
        .enum(["A", "C", "B"])
        .describe("Data type to return. Example: C"),
      format: z
        .enum([
          "text/csv",
          "application/json",
          "application/xml",
          "application/vnd.google-earth.kml",
        ])
        .describe(
          "MIME type of the file to be returned. Example: application/json"
        ),
      startdate: z
        .string()
        .optional()
        .describe(
          "The start date and time of the data requested. Format: UTC Date or DateTime as beginning of measurement period. Examples: 2014-01-01T13:00, 2014-01-01T13, or 2014-01-01"
        ),
      enddate: z
        .string()
        .optional()
        .describe(
          "The end date and time of the data requested. Format: UTC Date or DateTime as end of measurement period. Examples: 2014-01-02T13:00, 2014-01-02T13, or 2014-01-02"
        ),
      monitortype: z
        .enum(["0", "1", "2"])
        .optional()
        .describe(
          "The type of monitor to be returned. Options include: Permanent Only (0), Mobile Only (1), Permanent and Mobile (2). Example: 0"
        ),
      verbose: z
        .enum(["0", "1"])
        .optional()
        .describe(
          "When set to 1, provides additional site information including Site Name, Agency Name, AQS ID, and Full AQS ID. Default is 0."
        ),
      includerawconcentrations: z
        .enum(["0", "1"])
        .optional()
        .describe(
          "When set to 1, an additional field that contains the raw concentration will be added to the output. Default is 0."
        ),
    },
    async (params) => {
      const result =
        await airnowApi.fetchObservationsByMonitoringSiteByGeographicBoundingBox(
          params
        );
      if (result === null) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch observations data from AirNow API.",
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
