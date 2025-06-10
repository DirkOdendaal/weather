"use server";

import { Location } from "@/types/location";
import { Forecast, Weather } from "@/types/weather";
import axios from "axios";

export const getWeatherByLocation = async (location: Location): Promise<Weather> => {
	const response = await axios.get(`${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/weather`, {
		params: {
			lat: location.lat,
			lon: location.lon,
			appid: process.env.OPEN_WEATHER_API_KEY,
			units: "metric",
		},
	});

	const data: Weather = response.data;

	return data;
};

export const getForecastByLocation = async (location: Location): Promise<Forecast> => {
	const response = await axios.get(`${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/forecast`, {
		params: {
			lat: location.lat,
			lon: location.lon,
			appid: process.env.OPEN_WEATHER_API_KEY,
			units: "metric",
		},
	});

	const data: Forecast = response.data;

	return data;
};
