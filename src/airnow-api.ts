import { AIRNOW_API_HOSTNAME, AIRNOW_API_KEY } from "./config.js";

async function airnowGet(endpoint: string, queryParams: URLSearchParams): Promise<string | null> {
  queryParams.append('api_key', AIRNOW_API_KEY);

  try {
    const response = await fetch(`${AIRNOW_API_HOSTNAME}${endpoint}?${queryParams}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
    }
    return response.text();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}

export async function fetchForecastByZipCode(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/forecast/zipcode/';
  const queryParams = new URLSearchParams();
  queryParams.append('zipCode', params.zipCode);
  queryParams.append('format', params.format);
  if (params.date) queryParams.append('date', params.date);
  if (params.distance) queryParams.append('distance', params.distance);

  return airnowGet(endpoint, queryParams);
}

export async function fetchForecastByLatLong(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/forecast/latlong/';
  const queryParams = new URLSearchParams();
  queryParams.append('latitude', params.latitude);
  queryParams.append('longitude', params.longitude);
  queryParams.append('format', params.format);
  if (params.date) queryParams.append('date', params.date);
  if (params.distance) queryParams.append('distance', params.distance);

  return airnowGet(endpoint, queryParams);
}

export async function fetchCurrentObservationsByReportingAreaByZipCode(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/observation/zipcode/current/';
  const queryParams = new URLSearchParams();
  queryParams.append('zipCode', params.zipCode);
  queryParams.append('format', params.format);
  if (params.distance) queryParams.append('distance', params.distance);

  return airnowGet(endpoint, queryParams);
}

export async function fetchCurrentObservationsByReportingAreaByLatLong(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/observation/latlong/current/';
  const queryParams = new URLSearchParams();
  queryParams.append('latitude', params.latitude);
  queryParams.append('longitude', params.longitude);
  queryParams.append('format', params.format);
  if (params.distance) queryParams.append('distance', params.distance);

  return airnowGet(endpoint, queryParams);
}

export async function fetchHistoricalObservationsByReportingAreaByZipCode(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/observation/zipcode/historical/';
  const queryParams = new URLSearchParams();
  queryParams.append('zipCode', params.zipCode);
  queryParams.append('date', params.date);
  queryParams.append('format', params.format);
  if (params.distance) queryParams.append('distance', params.distance);

  return airnowGet(endpoint, queryParams);
}

export async function fetchHistoricalObservationsByReportingAreaByLatLong(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/observation/latlong/historical/';
  const queryParams = new URLSearchParams();
  queryParams.append('latitude', params.latitude);
  queryParams.append('longitude', params.longitude);
  queryParams.append('date', params.date);
  queryParams.append('format', params.format);
  if (params.distance) queryParams.append('distance', params.distance);

  return airnowGet(endpoint, queryParams);
}

export async function fetchObservationsByMonitoringSiteByGeographicBoundingBox(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/data/';
  const queryParams = new URLSearchParams();
  queryParams.append('bbox', params.bbox);
  queryParams.append('parameters', params.parameters);
  queryParams.append('datatype', params.datatype);
  queryParams.append('format', params.format);
  queryParams.append('verbose', params.verbose || '0');
  queryParams.append('includerawconcentrations', params.includerawconcentrations || '0');
  if (params.startdate && params.enddate) {
    queryParams.append('startdate', params.startdate);
    queryParams.append('enddate', params.enddate);
  }
  if (params.monitortype) queryParams.append('monitortype', params.monitortype);

  return airnowGet(endpoint, queryParams);
}

export async function fetchContourMapsByGeographicBoundingBoxPM25(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/kml/pm25/';
  const queryParams = new URLSearchParams();
  queryParams.append('date', params.date);
  queryParams.append('bbox', params.bbox);
  queryParams.append('srs', params.srs || 'EPSG:4326');

  return airnowGet(endpoint, queryParams);
}

export async function fetchContourMapsByGeographicBoundingBoxOzone(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/kml/ozone/';
  const queryParams = new URLSearchParams();
  queryParams.append('date', params.date);
  queryParams.append('bbox', params.bbox);
  queryParams.append('srs', params.srs || 'EPSG:4326');

  return airnowGet(endpoint, queryParams);
}

export async function fetchContourMapsByBoundingBoxCombinedOzonePM25(params: Record<string, string>): Promise<string | null> {
  const endpoint = 'aq/kml/combined/';
  const queryParams = new URLSearchParams();
  queryParams.append('date', params.date);
  queryParams.append('bbox', params.bbox);
  queryParams.append('srs', params.srs || 'EPSG:4326');

  return airnowGet(endpoint, queryParams);
}