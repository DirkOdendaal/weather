"use server";

import { Location } from "@/types/location";
import axios from "axios";

export const getLocationByCityName = async (cityName: string): Promise<Location> => {
	const response = await axios.get(`${process.env.OPEN_WEATHER_BASE_URL}/geo/1.0/direct`, {
		params: {
			q: cityName,
			limit: 1,
			appid: process.env.OPEN_WEATHER_API_KEY,
		},
	});

	if (response.data.length === 0) {
		throw new Error("Location not found");
	}
	const locationData: Location = response.data[0];

	return locationData;
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
	const locationData: Location = response.data[0];

	return locationData;
};
