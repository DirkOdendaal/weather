import { getLocationByCityName } from "@/api/location";
import { getWeatherByLocation, getForecastByLocation } from "@/api/weather";
import { ForecastListItem, Weather } from "@/types/weather";
import { aggregateForecastByDay } from "@/utils/weather-utils";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

interface WeatherState {
	currentWeather: Weather | null;
	forecast: Array<ForecastListItem> | null;
	isLoading: boolean;
	error: string | null;
}

enum WeatherActionTypes {
	SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER",
	SET_FORECAST = "SET_FORECAST",
	SET_LOADING = "SET_LOADING",
	SET_ERROR = "SET_ERROR",
}

type WeatherActions =
	| { type: WeatherActionTypes.SET_CURRENT_WEATHER; payload: Weather | null }
	| { type: WeatherActionTypes.SET_FORECAST; payload: Array<ForecastListItem> | null }
	| { type: WeatherActionTypes.SET_LOADING; payload: boolean }
	| { type: WeatherActionTypes.SET_ERROR; payload: string | null };

const initialState: WeatherState = {
	currentWeather: null,
	forecast: null,
	isLoading: true,
	error: null,
};

interface WeatherContextType extends WeatherState {
	setWeatherByLocation: (location: string) => void;
}

const weatherReducer = (state: WeatherState, action: WeatherActions): WeatherState => {
	switch (action.type) {
		case WeatherActionTypes.SET_CURRENT_WEATHER:
			return { ...state, currentWeather: action.payload };
		case WeatherActionTypes.SET_FORECAST:
			return { ...state, forecast: action.payload };
		case WeatherActionTypes.SET_LOADING:
			return { ...state, isLoading: action.payload };
		case WeatherActionTypes.SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children, location }: { children: React.ReactNode; location: string }) => {
	const [state, dispatch] = useReducer(weatherReducer, initialState);

	useEffect(() => {
		dispatch({ type: WeatherActionTypes.SET_LOADING, payload: true });
		setWeatherByLocation(location);
	}, [location]);

	const setWeatherByLocation = async (location: string) => {
		try {
			const locationResponse = await getLocationByCityName(location);
			const currentWeatherResponse = await getWeatherByLocation(locationResponse);
			const forecastResponse = await getForecastByLocation(locationResponse);
			const dailyForecast = aggregateForecastByDay(forecastResponse);

			dispatch({ type: WeatherActionTypes.SET_CURRENT_WEATHER, payload: currentWeatherResponse });
			dispatch({ type: WeatherActionTypes.SET_FORECAST, payload: dailyForecast });
		} catch (error) {
			dispatch({
				type: WeatherActionTypes.SET_ERROR,
				payload: error instanceof Error ? error.message : "Failed to fetch weather data",
			});
			dispatch({ type: WeatherActionTypes.SET_CURRENT_WEATHER, payload: null });
			dispatch({ type: WeatherActionTypes.SET_FORECAST, payload: null });
		} finally {
			dispatch({ type: WeatherActionTypes.SET_LOADING, payload: false });
		}
	};

	const context = useMemo(
		() => ({
			currentWeather: state.currentWeather,
			forecast: state.forecast,
			isLoading: state.isLoading,
			error: state.error,
			setWeatherByLocation,
		}),
		[state.currentWeather, state.forecast, state.isLoading, state.error],
	);

	return <WeatherContext.Provider value={context}>{children}</WeatherContext.Provider>;
};

export const useWeatherContext = () => {
	const context = useContext(WeatherContext);

	if (!context) {
		throw new Error("useWeatherContext must be used within a WeatherProvider");
	}

	return context;
};
