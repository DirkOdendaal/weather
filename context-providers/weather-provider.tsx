import { getLocationByCityName, getLocationByCoordinates } from "@/api/location";
import { getWeatherByLocation, getForecastByLocation } from "@/api/weather";
import { ForecastListItem, Weather } from "@/types/weather";
import { aggregateForecastByDay } from "@/utils/weather-utils";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useAppContext } from "./application-provider";
import { LanguageCodes } from "@/enums/languages-codes";
import { Units } from "@/enums/unit";
import { LatLon } from "@/types/location";
import { getCurrentLocation } from "@/utils/utils";

interface WeatherState {
	currentWeather: Weather | null;
	forecast: Array<ForecastListItem> | null;
	isLoading: boolean;
	error: string | null;
	locationName: string;
}

enum WeatherActionTypes {
	SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER",
	SET_FORECAST = "SET_FORECAST",
	SET_LOADING = "SET_LOADING",
	SET_LOCATION_NAME = "SET_LOCATION_NAME",
	SET_ERROR = "SET_ERROR",
}

type WeatherActions =
	| { type: WeatherActionTypes.SET_CURRENT_WEATHER; payload: Weather | null }
	| { type: WeatherActionTypes.SET_FORECAST; payload: Array<ForecastListItem> | null }
	| { type: WeatherActionTypes.SET_LOADING; payload: boolean }
	| { type: WeatherActionTypes.SET_LOCATION_NAME; payload: string }
	| { type: WeatherActionTypes.SET_ERROR; payload: string | null };

const initialState: WeatherState = {
	currentWeather: null,
	error: null,
	forecast: null,
	isLoading: true,
	locationName: "",
};

interface WeatherContextType extends WeatherState {
	setWeatherByLocation: (location: LatLon, languageCode: LanguageCodes, unit: Units) => void;
	changeLocation: (location: string) => void;
}

const weatherReducer = (state: WeatherState, action: WeatherActions): WeatherState => {
	switch (action.type) {
		case WeatherActionTypes.SET_CURRENT_WEATHER:
			return { ...state, currentWeather: action.payload };
		case WeatherActionTypes.SET_FORECAST:
			return { ...state, forecast: action.payload };
		case WeatherActionTypes.SET_LOADING:
			return { ...state, isLoading: action.payload };
		case WeatherActionTypes.SET_LOCATION_NAME:
			return { ...state, locationName: action.payload };
		case WeatherActionTypes.SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(weatherReducer, initialState);
	const { languageConfig, unit } = useAppContext();

	const [location, setLocation] = useState<LatLon | null>(null);

	useEffect(() => {
		dispatch({ type: WeatherActionTypes.SET_LOADING, payload: true });
		getCurrentLocation().then(setLocation);
	}, []);

	useEffect(() => {
		if (!location) return;

		dispatch({ type: WeatherActionTypes.SET_LOADING, payload: true });
		setWeatherByLocation(location, languageConfig.languageCode, unit);
	}, [location, languageConfig, unit]);

	const setWeatherByLocation = async (location: LatLon, languageCode: LanguageCodes, unit: Units) => {
		try {
			const locationResponse = await getLocationByCoordinates(location.lat, location.lon);
			const currentWeatherResponse = await getWeatherByLocation(locationResponse, languageCode, unit);
			const forecastResponse = await getForecastByLocation(locationResponse, languageCode, unit);
			const dailyForecast = aggregateForecastByDay(forecastResponse);

			dispatch({ type: WeatherActionTypes.SET_LOCATION_NAME, payload: locationResponse.name });
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

	const changeLocation = async (newLocation: string) => {
		dispatch({ type: WeatherActionTypes.SET_LOADING, payload: true });
		const locationResponse = await getLocationByCityName(newLocation);

		setWeatherByLocation(locationResponse, languageConfig.languageCode, unit);
		dispatch({ type: WeatherActionTypes.SET_LOADING, payload: false });
	};

	const context = useMemo(
		() => ({
			currentWeather: state.currentWeather,
			forecast: state.forecast,
			isLoading: state.isLoading,
			error: state.error,
			locationName: state.locationName,
			setWeatherByLocation,
			changeLocation,
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
