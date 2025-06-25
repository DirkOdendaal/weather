import { LanguageCodes } from "@/enums/languages-codes";
import { LatLon } from "@/types/location";

export const getFormattedDate = (timestamp: number, language: LanguageCodes): string => {
	const locale = language === LanguageCodes.EN ? "en-US" : "nl-NL"; // Adjust based on your language codes

	return new Date(timestamp * 1000).toLocaleDateString(locale, {
		weekday: "long",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
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
