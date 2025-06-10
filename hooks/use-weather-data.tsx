import { useEffect, useState } from "react";

import { CurrentWeatherType, ForecastType } from "@/types/weather";

const useWeatherData = (location: string) => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        // For this example, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data based on location
        if (location.toLowerCase() === "error") {
          throw new Error("Location not found");
        }

        setCurrentWeather(generateMockCurrentWeather(location));
        setForecast(generateMockForecast());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch weather data",
        );
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

// Mock data generators
function generateMockCurrentWeather(location: string): CurrentWeatherType {
  const conditions = [
    { temp: 28, condition: "sunny", icon: "01d" },
    { temp: 22, condition: "partly cloudy", icon: "02d" },
    { temp: 18, condition: "cloudy", icon: "03d" },
    { temp: 15, condition: "rainy", icon: "10d" },
    { temp: 12, condition: "thunderstorm", icon: "11d" },
  ];

  // Use location string to deterministically select a condition
  const hash = location
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedCondition = conditions[hash % conditions.length];

  return {
    temperature: selectedCondition.temp,
    condition: selectedCondition.condition,
    feelsLike: selectedCondition.temp - 2,
    humidity: 45 + (hash % 30),
    windSpeed: 5 + (hash % 15),
    pressure: 1010 + (hash % 20),
    icon: selectedCondition.icon,
  };
}

function generateMockForecast(): ForecastType[] {
  const today = new Date();
  const forecast: ForecastType[] = [];

  const conditions = [
    {
      condition: "sunny",
      icon: "01d",
      minTemp: 22,
      maxTemp: 28,
      precipitation: 0,
    },
    {
      condition: "partly cloudy",
      icon: "02d",
      minTemp: 18,
      maxTemp: 24,
      precipitation: 10,
    },
    {
      condition: "cloudy",
      icon: "03d",
      minTemp: 16,
      maxTemp: 22,
      precipitation: 20,
    },
    {
      condition: "rainy",
      icon: "10d",
      minTemp: 14,
      maxTemp: 18,
      precipitation: 60,
    },
    {
      condition: "thunderstorm",
      icon: "11d",
      minTemp: 12,
      maxTemp: 16,
      precipitation: 80,
    },
    {
      condition: "clear",
      icon: "01d",
      minTemp: 20,
      maxTemp: 26,
      precipitation: 5,
    },
    {
      condition: "overcast",
      icon: "04d",
      minTemp: 17,
      maxTemp: 23,
      precipitation: 30,
    },
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);

    date.setDate(today.getDate() + i);

    const condition = conditions[i % conditions.length];

    forecast.push({
      date: date.toISOString().split("T")[0],
      minTemp: condition.minTemp,
      maxTemp: condition.maxTemp,
      condition: condition.condition,
      precipitation: condition.precipitation,
      icon: condition.icon,
    });
  }

  return forecast;
}

export default useWeatherData;
