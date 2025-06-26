import { LanguageCodes } from "@/enums/languages-codes";
import { LatLon } from "@/types/location";
import axios from "axios";

export const getFormattedDate = (timestamp: number, language: LanguageCodes): string => {
	const locale = language === LanguageCodes.EN ? "en-US" : "nl-NL"; // Adjust based on your language codes

	return new Date(timestamp * 1000).toLocaleDateString(locale, {
		weekday: "long",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
};

export const getLocationByIP = async (): Promise<LatLon> => {
	try {
		const response = await axios.get("https://ipapi.co/json/");

		const location = response.data;

		return { lat: location.latitude, lon: location.longitude };
	} catch {
		return { lat: 52.3676, lon: 4.9041 };
	}
};

export const getCurrentLocation = async (): Promise<LatLon> => {
	// Check if we're in the browser and geolocation is available
	if (typeof window === "undefined" || !navigator?.geolocation) {
		// If no geolocation API, fall back to IP-based location
		return getLocationByIP();
	}

	try {
		// Try GPS location with 1/2-second timeout
		const gpsLocation = await Promise.race([
			new Promise<LatLon>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;

						resolve({ lat: latitude, lon: longitude });
					},
					reject,
					{
						timeout: 500, // 1-second timeout
						enableHighAccuracy: false, // Faster, less accurate
						maximumAge: 300000, // Accept 5-minute old cached location
					},
				);
			}),
			new Promise<never>((_, reject) => {
				setTimeout(() => reject(new Error("GPS timeout")), 500);
			}),
		]);

		return gpsLocation;
	} catch {
		// If GPS fails or times out, fall back to IP-based location
		return getLocationByIP();
	}
};
