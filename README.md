# AirNow MCP Server

## Overview

The unofficial AirNow MCP Server is a Model Context Protocol (MCP) implementation that enables integration between large language models (LLMs) and the AirNow API for U.S. air quality data. This server provides a comprehensive set of tools that allows LLMs to access and utilize real-time, forecasted, and historical air quality information.

## Key Features

- Direct access to AirNow API resources through standardized MCP tools
- Natural language interface for querying air quality data
- Support for current, forecasted, and historical AQI, observations, and contour maps
- Easy integration via NPX/Docker

## About the AirNow API

The [AirNow API](https://docs.airnowapi.org/webservices) provides access to official U.S. air quality data, including:

- **Current and Forecasted Air Quality Index (AQI):**  
  Retrieve real-time and forecasted AQI values for ozone, PM2.5, and PM10 for specific locations or regions.

- **Observations and Reporting Areas:**  
  Access air quality observations by ZIP code, latitude/longitude, bounding box, or reporting area.

- **Air Quality Maps:**  
  Obtain contour maps for ozone and PM2.5, available as images or data overlays.

- **Historical Data:**  
  Query historical air quality data for supported pollutants.

- **Health Recommendations:**  
  The API provides health recommendations and cautionary statements based on AQI levels.
 
For detailed information on endpoints, parameters, and response formats, log in with your AirNow API account and go to the [AirNow API Web Services Documentation](https://docs.airnowapi.org/webservices).

## Available Tools

### Forecasts

- **forecast_by_lat_long** – Get current or historical forecasted AQI values and categories for a reporting area by latitude and longitude.
- **forecast_by_zip_code** – Get current or historical forecasted AQI values and categories for a reporting area by Zip code.

### Contour Maps

- **contour_maps_by_geographic_bounding_box_ozone** – Get current or historical ozone contour maps in KML.
- **contour_maps_by_geographic_bounding_box_pm25** – Get current or historical PM2.5 contour maps in KML.
- **contour_maps_by_bounding_box_combined_ozone_pm25** – Get current or historical contour maps in KML for combined ozone and PM2.5 values.

### Observations

- **current_observations_by_reporting_area_by_lat_long** – Get current AQI values and categories for a reporting area by latitude and longitude.
- **current_observations_by_reporting_area_by_zip_code** – Get current AQI values and categories for a reporting area by Zip code.
- **observations_by_monitoring_site_by_geographic_bounding_box** – Get AQI values or data concentrations for a specified date and time range and set of parameters within a geographic area of interest.

### Historical Data

- **historical_observations_by_reporting_area_by_lat_long** – Get historical AQI values and categories for a reporting area by latitude and longitude.
- **historical_observations_by_reporting_area_by_zip_code** – Get historical AQI values and categories for a reporting area by Zip code.

## Requirements

- An AirNow API key, which you can obtain by requesting an [AirNow API Account](https://docs.airnowapi.org/account/request/).
- For use with NPX, `Node.js >= v22.14.0` is required.

## Configuration

### Claude Desktop

Add one of these configurations to your `claude_desktop_config.json`:

#### NPX

```json
{
  "mcpServers": {
    "airnow-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@prsantos/airnow-mcp-server"
      ],
      "env":{
        "AIRNOW_API_KEY": "<YOUR-AIRNOW-API-KEY>",
        "LOG_LEVEL": "<ANY-LOG-LEVEL>" // Optional. Not setting will default to "info"
      }
    }
  }
}
```

#### Docker

```json
{
  "mcpServers": {
    "airnow-mcp-server": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "AIRNOW_API_KEY",
        "-e",
        "LOG_LEVEL",
        "prsantos/airnow-mcp-server"
      ],
      "env":{
        "AIRNOW_API_KEY": "<YOUR-AIRNOW-API-KEY>",
        "LOG_LEVEL": "<ANY-LOG-LEVEL>" // Optional. Not setting will default to "info"
      }
    }
  }
}
```
