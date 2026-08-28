import { fetchForecast, fetchWeather, reverseGeocode, searchLocations } from "@/services/weather-api";
import { ForecastListItem, Weather } from "@/types/weather";
import { aggregateForecastByDay } from "@/utils/weather-utils";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppContext } from "./application-provider";
import { LatLon, Location } from "@/types/location";
import { getCurrentLocation } from "@/utils/utils";

const LAST_LOCATION_STORAGE_KEY = "weather:last-location";

interface WeatherContextType {
  currentWeather: Weather | null;
  forecast: Array<ForecastListItem> | null;
  isLoading: boolean;
  error: string | null;
  locationName: string;
  changeLocation: (location: string) => void;
  selectLocation: (location: Location) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const { languageConfig, unit } = useAppContext();
  const languageCode = languageConfig.languageCode;

  const [storedLocation, setStoredLocation] = useLocalStorage<Location | null>(LAST_LOCATION_STORAGE_KEY, null);
  const [location, setLocation] = useState<Location | null>(null);
  const [coordinates, setCoordinates] = useState<LatLon | null>(null);

  // On mount: prefer the last location, otherwise fall back to browser geolocation.
  useEffect(() => {
    if (storedLocation) {
      setLocation(storedLocation);
    } else {
      getCurrentLocation().then(setCoordinates);
    }
  }, []);

  const reverseGeocodeQuery = useQuery({
    queryKey: ["geocode-reverse", coordinates?.lat, coordinates?.lon],
    queryFn: () => reverseGeocode(coordinates as LatLon),
    enabled: Boolean(coordinates) && !location,
  });

  useEffect(() => {
    if (reverseGeocodeQuery.data) {
      setLocation(reverseGeocodeQuery.data);
    }
  }, [reverseGeocodeQuery.data]);

  // Persist whatever location we settle on so the next visit loads instantly.
  useEffect(() => {
    if (location) {
      setStoredLocation(location);
    }
  }, [location, setStoredLocation]);

  const weatherQuery = useQuery({
    queryKey: ["weather", location?.lat, location?.lon, languageCode, unit],
    queryFn: () => fetchWeather(location as Location, languageCode, unit),
    enabled: Boolean(location),
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", location?.lat, location?.lon, languageCode, unit],
    queryFn: () => fetchForecast(location as Location, languageCode, unit),
    enabled: Boolean(location),
    select: aggregateForecastByDay,
  });

  const locationSearchMutation = useMutation({
    mutationFn: async (cityName: string) => {
      const results = await searchLocations(cityName);

      if (results.length === 0) {
        throw new Error("Location not found");
      }

      return results[0];
    },
    onSuccess: setLocation,
  });

  const { mutate: searchAndSelectLocation } = locationSearchMutation;

  const changeLocation = useCallback(
    (cityName: string) => {
      searchAndSelectLocation(cityName);
    },
    [searchAndSelectLocation],
  );

  const selectLocation = useCallback((selectedLocation: Location) => {
    setLocation(selectedLocation);
  }, []);

  // Until a location resolves (from storage, geolocation + reverse geocode, or search) we are still loading,
  // unless one of those steps has actually errored.
  const isResolvingLocation = !location && !reverseGeocodeQuery.isError && !locationSearchMutation.isError;

  const isLoading = isResolvingLocation || (Boolean(location) && (weatherQuery.isLoading || forecastQuery.isLoading));

  const error = location
    ? (weatherQuery.error?.message ?? forecastQuery.error?.message ?? locationSearchMutation.error?.message ?? null)
    : (reverseGeocodeQuery.error?.message ?? locationSearchMutation.error?.message ?? null);

  const context = useMemo<WeatherContextType>(
    () => ({
      currentWeather: weatherQuery.data ?? null,
      forecast: forecastQuery.data ?? null,
      isLoading,
      error,
      locationName: location?.name ?? "",
      changeLocation,
      selectLocation,
    }),
    [weatherQuery.data, forecastQuery.data, isLoading, error, location?.name, changeLocation, selectLocation],
  );

  return <WeatherContext.Provider value={context}>{children}</WeatherContext.Provider>;
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }

  return context;
};
