import { getForecastByLocation, getWeatherByLocation } from "@/api/weather";
import { LanguageCodes } from "@/enums/languages-codes";
import { Units } from "@/enums/unit";
import { Location } from "@/types/location";
import { Forecast, Weather } from "@/types/weather";
import axios from "axios";
import "@testing-library/jest-dom";

describe("Weather API", () => {
	const mockLocation: Location = {
		lat: 40.7128,
		lon: -74.006,
		zip: "",
		name: "",
		country: "",
	};

	it("should fetch current weather data", async () => {
		const mockWeatherData: Weather = {
			weather: [
				{
					id: 0,
					main: "",
					description: "",
					icon: "",
				},
			],
			main: {
				feels_like: 0,
				humidity: 0,
				pressure: 0,
				temp_max: 0,
				temp_min: 0,
				temp: 0,
			},
			visibility: 0,
			wind: {
				speed: 0,
				deg: 0,
				gust: 0,
			},
		};

		jest.spyOn(axios, "get").mockResolvedValue({
			data: mockWeatherData,
		});

		const weather = await getWeatherByLocation(mockLocation, LanguageCodes.EN, Units.Metric);

		expect(weather).toEqual(mockWeatherData);
		expect(axios.get).toHaveBeenCalledWith(`${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/weather`, {
			params: {
				lat: mockLocation.lat,
				lon: mockLocation.lon,
				appid: process.env.OPEN_WEATHER_API_KEY,
				units: Units.Metric,
				lang: LanguageCodes.EN,
			},
		});
	});

	it("should fetch weather forecast data", async () => {
		const mockForecastData: Forecast = {
			cod: "",
			message: 0,
			cnt: 0,
			list: [],
			city: {
				id: 0,
				name: "",
				coord: {
					lat: 0,
					lon: 0,
				},
				country: "",
				population: 0,
				timezone: 0,
				sunrise: 0,
				sunset: 0,
			},
		};

		jest.spyOn(axios, "get").mockResolvedValue({
			data: mockForecastData,
		});

		const forecast = await getForecastByLocation(mockLocation, LanguageCodes.EN, Units.Metric);

		expect(forecast).toEqual(mockForecastData);
	});
});
