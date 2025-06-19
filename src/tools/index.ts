import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerContourMapsByBoundingBoxCombined } from "./contour-maps-by-bounding-box-combined-ozone-pm25.js";
import { registerContourMapsByBoundingBoxOzone } from "./contour-maps-by-geographic-bounding-box-ozone.js";
import { registerContourMapsByBoundingBoxPM25 } from "./contour-maps-by-geographic-bounding-box-pm25.js";
import { registerCurrentObservationsByZipCode } from "./current-observations-by-reporting-area-by-zip-code.js";
import { registerCurrentObservationsByLatLong } from "./current-observations-by-reporting-area-by-lat-long.js";
import { registerForecastByLatLong } from "./forecast-by-lat-long.js";
import { registerForecastByZipCode } from "./forecast-by-zip-code.js";
import { registerHistoricalObservationsByLatLong } from "./historical-observations-by-reporting-area-by-lat-long.js";
import { registerHistoricalObservationsByZipCode } from "./historical-observations-by-reporting-area-by-zip-code.js";
import { registerObservationsByBoundingBox } from "./observations-by-monitoring-site-by-geographic-bounding-box.js";

export const registerTools = (server: McpServer): void => {
  registerContourMapsByBoundingBoxCombined(server);
  registerContourMapsByBoundingBoxOzone(server);
  registerContourMapsByBoundingBoxPM25(server);
  registerCurrentObservationsByZipCode(server);
  registerCurrentObservationsByLatLong(server);
  registerForecastByLatLong(server);
  registerForecastByZipCode(server);
  registerHistoricalObservationsByLatLong(server);
  registerHistoricalObservationsByZipCode(server);
  registerObservationsByBoundingBox(server);
};