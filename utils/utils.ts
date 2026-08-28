import { LanguageCodes } from "@/enums/languages-codes";
import { LatLon } from "@/types/location";

const LOCALE_BY_LANGUAGE: Record<LanguageCodes, string> = {
  [LanguageCodes.EN]: "en-US",
  [LanguageCodes.NL]: "nl-NL",
};

/**
 * Formats a UNIX (seconds) timestamp as a weekday + short date.
 * Pass `timeZone` (e.g. "UTC") to format in a fixed zone; omit it to use the viewer's local zone.
 */
export const getFormattedDate = (timestamp: number, language: LanguageCodes, timeZone?: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  if (timeZone) {
    options.timeZone = timeZone;
  }

  return new Date(timestamp * 1000).toLocaleDateString(LOCALE_BY_LANGUAGE[language] ?? "en-US", options);
};

export const getCurrentLocation = (): Promise<LatLon> => {
  return new Promise((resolve) => {
    // Check if we're in the browser and geolocation is available
    if (typeof window === "undefined" || !navigator?.geolocation) {
      // Fallback to Amsterdam coordinates
      resolve({ lat: 52.3676, lon: 4.9041 });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({ lat: latitude, lon: longitude });
      },
      () => {
        // On error (permission denied, timeout, etc.), use fallback
        resolve({ lat: 52.3676, lon: 4.9041 });
      },
    );
  });
};
