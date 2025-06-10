export interface Weather {
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string; // The Open weather icon code
		},
	];
	main: WeatherMain;
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
}

export interface WeatherMain {
	feels_like: number;
	humidity: number;
	pressure: number;
	temp_max: number;
	temp_min: number;
	temp: number;
}

export interface Forecast {
	cod: string;
	message: number;
	cnt: number;
	list: Array<ForecastListItem>;
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}

export interface ForecastListItem {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
	};
	weather: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	clouds: {
		all: number;
	};
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	visibility: number;
	pop: number; // Probability of precipitation
	sys: {
		pod: string;
	};
	dt_txt: string;
}
