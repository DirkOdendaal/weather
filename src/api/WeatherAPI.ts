import { Location } from "@/interfaces/Location";
import { WeatherConditions } from "@/interfaces/WeatherConditions";
import { WeatherForecast } from "@/interfaces/WeatherForecast";
import axios from "axios";

export const getLocation = async (cityName: string): Promise<Array<Location>> => {
  const url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL}/geo/1.0/direct?q=${cityName}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&lmit=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_LIMIT}`;
  const response: Array<Location> = (await axios.get(url)).data;

  return response;
};

export const getWeather = async (lat: number, lon: number): Promise<WeatherConditions> => {
  const url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&lmit=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_LIMIT}&units=metric`;

  const response: WeatherConditions = (await axios.get(url)).data;

  return response;
};

export const getForecast = async (lat: number, lon: number): Promise<WeatherForecast> => {
  const url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&lmit=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_LIMIT}&units=metric`;

  const response: WeatherForecast = (await axios.get(url)).data;

  return response;
};

