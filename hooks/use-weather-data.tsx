import { useEffect, useState } from "react";

import { ForecastListItem, Weather } from "@/types/weather";
import { getLocationByCityName } from "@/api/location";
import { getForecastByLocation, getWeatherByLocation } from "@/api/weather";
import { aggregateForecastByDay } from "@/utils/weather-utils";

const useWeatherData = (location: string) => {
	const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
	const [forecast, setForecast] = useState<Array<ForecastListItem> | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWeatherData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const locationResponse = await getLocationByCityName(location);
				const currentWeatherResponse = await getWeatherByLocation(locationResponse);
				const forecastResponse = await getForecastByLocation(locationResponse);
				const dailyForecast = aggregateForecastByDay(forecastResponse);

				setCurrentWeather(currentWeatherResponse);
				setForecast(dailyForecast);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch weather data");
				setCurrentWeather(null);
				setForecast(null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchWeatherData();
	}, [location]);

	return { currentWeather, forecast, isLoading, error };
};

export default useWeatherData;
