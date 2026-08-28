import { LanguageCodes } from "@/enums/languages-codes";
import { Units } from "@/enums/unit";

export const parseLanguage = (value: string | null): LanguageCodes =>
  Object.values(LanguageCodes).includes(value as LanguageCodes) ? (value as LanguageCodes) : LanguageCodes.EN;

export const parseUnits = (value: string | null): Units =>
  Object.values(Units).includes(value as Units) ? (value as Units) : Units.Metric;

export const parseCoordinates = (searchParams: URLSearchParams): { lat: number; lon: number } | null => {
  const latRaw = searchParams.get("lat");
  const lonRaw = searchParams.get("lon");

  if (latRaw === null || lonRaw === null) {
    return null;
  }

  const lat = Number(latRaw);
  const lon = Number(lonRaw);

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return null;
  }

  return { lat, lon };
};
