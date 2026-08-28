import { LanguageCodes } from "@/enums/languages-codes";
import { Units } from "@/enums/unit";
import { LatLon, Location } from "@/types/location";
import { Forecast, Weather } from "@/types/weather";

const request = async <T>(path: string, params: Record<string, string>): Promise<T> => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${path}?${query}`);

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;

    throw new Error(body?.error ?? `Request to ${path} failed (${response.status})`);
  }

  return response.json() as Promise<T>;
};

export const fetchWeather = (location: LatLon, language: LanguageCodes, units: Units): Promise<Weather> =>
  request<Weather>("/api/weather", {
    lat: String(location.lat),
    lon: String(location.lon),
    lang: language,
    units,
  });

export const fetchForecast = (location: LatLon, language: LanguageCodes, units: Units): Promise<Forecast> =>
  request<Forecast>("/api/forecast", {
    lat: String(location.lat),
    lon: String(location.lon),
    lang: language,
    units,
  });

export const searchLocations = (query: string): Promise<Array<Location>> =>
  request<Array<Location>>("/api/geocode", { q: query });

export const reverseGeocode = (location: LatLon): Promise<Location> =>
  request<Location>("/api/geocode", { lat: String(location.lat), lon: String(location.lon) });
