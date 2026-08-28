import { Units } from "@/enums/unit";

/**
 * OpenWeather returns wind speed in mph for imperial units and in m/s for metric/standard units.
 * Metric/standard speeds are converted to km/h for display.
 */
export const formatWindSpeed = (speedFromApi: number, units: Units): string =>
  units === Units.Imperial ? `${Math.round(speedFromApi)} mph` : `${Math.round(speedFromApi * 3.6)} km/h`;
