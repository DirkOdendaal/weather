import { WeatherMain } from "./WeatherMain";

export interface WeatherConditions {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: WeatherMain;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  dt: number;
  dt_txt: string;
}
