export interface CurrentWeatherType {
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
}

export interface ForecastType {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  precipitation: number;
  icon: string;
}
