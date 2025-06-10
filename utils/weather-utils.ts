import { Forecast, ForecastListItem } from "@/types/weather";

export const getWeatherIcon = (condition: string): string => {
	const iconMap: Record<string, string> = {
		"01d": "wi:day-sunny",
		"01n": "wi:moon-alt-new",
		"02d": "wi:forecast-io-partly-cloudy-day",
		"02n": "wi:forecast-io-partly-cloudy-night",
		"03d": "wi:forecast-io-partly-cloudy-night",
		"03n": "wi:forecast-io-partly-cloudy-night",
		"04d": "wi:cloudy",
		"04n": "wi:cloudy",
		"09d": "wi:wu-rain",
		"09n": "wi:wu-rain",
		"10d": "wi:day-rain",
		"10n": "wi:night-alt-rain",
		"11d": "wi:day-thunderstorm",
		"11n": "wi:night-alt-thunderstorm",
		"13d": "wi:snowflake-cold",
		"13n": "wi:snowflake-cold",
		"50d": "wi:fog",
		"50n": "wi:fog",
	};

	return iconMap[condition] || "lucide:cloud";
};

export const aggregateForecastByDay = (forecast: Forecast): Array<ForecastListItem> => {
	const days: Record<string, Array<ForecastListItem>> = {};

	forecast.list.forEach((item) => {
		const date = new Date(item.dt * 1000).toISOString().split("T")[0];

		if (!days[date]) days[date] = [];
		days[date].push(item);
	});

	const today = new Date();
	const todayStr = today.toISOString().split("T")[0];

	return Object.entries(days)
		.filter(([date]) => date !== todayStr)
		.map(([_date, items]) => {
			const main = {
				temp_min: Math.min(...items.map((i) => i.main.temp_min)),
				temp_max: Math.max(...items.map((i) => i.main.temp_max)),
				temp: items[Math.floor(items.length / 2)].main.temp, // median temp
				feels_like: items[Math.floor(items.length / 2)].main.feels_like,
				pressure: items[Math.floor(items.length / 2)].main.pressure,
				sea_level: items[Math.floor(items.length / 2)].main.sea_level,
				grnd_level: items[Math.floor(items.length / 2)].main.grnd_level,
				humidity: Math.round(items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length),
			};

			return {
				...items[0],
				dt: items[0].dt,
				main,
				weather: items[0].weather,
				pop: Math.round((items.reduce((sum, i) => sum + (i.pop ?? 0), 0) / items.length) * 100), // average pop as percent
				dt_txt: items[0].dt_txt,
			};
		});
};
