import { Location } from "@/types/location";
import axios from "axios";

interface GeoApiResult {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country?: string;
}

const toLocation = (result: GeoApiResult): Location => ({
  name: result.name,
  lat: result.lat,
  lon: result.lon,
  state: result.state,
  country: result.country,
});

export const searchLocations = async (query: string): Promise<Array<Location>> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return [];
  }

  const response = await axios.get(`${process.env.OPEN_WEATHER_BASE_URL}/geo/1.0/direct`, {
    params: {
      q: trimmedQuery,
      limit: 10,
      appid: process.env.OPEN_WEATHER_API_KEY,
    },
  });

  const seen = new Set<string>();

  return (response.data as Array<GeoApiResult>)
    .map(toLocation)
    .filter((location) => {
      // OpenWeather's geocoding API returns near/exact duplicate records for some cities
      // (e.g. "Den Haag", "Paris") - collapse anything with the same name/state/country.
      const key = `${location.name}|${location.state ?? ""}|${location.country ?? ""}`.toLowerCase();

      if (seen.has(key)) {
        return false;
      }
      seen.add(key);

      return true;
    })
    .slice(0, 5);
};

export const getLocationByCoordinates = async (lat: number, lon: number): Promise<Location> => {
  const response = await axios.get(`${process.env.OPEN_WEATHER_BASE_URL}/geo/1.0/reverse`, {
    params: {
      lat,
      lon,
      limit: 1,
      appid: process.env.OPEN_WEATHER_API_KEY,
    },
  });

  if (response.data.length === 0) {
    throw new Error("Location not found");
  }

  return toLocation(response.data[0]);
};
