import React, { FC } from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { Weather } from "@/types/weather";
import WeatherDetail from "./weather-detail";
import CurrentWeatherSkeleton from "./current-weather-skeleton";
import { getWeatherIcon } from "@/utils/weather-utils";

interface CurrentWeatherProps {
	currentWeather: Weather | null;
	isLoading: boolean;
}

const CurrentWeatherComponent: FC<CurrentWeatherProps> = ({ currentWeather, isLoading }) => {
	if (isLoading) {
		return <CurrentWeatherSkeleton />;
	}

	if (!currentWeather) {
		return (
			<Card className="h-full">
				<CardBody className="flex flex-col items-center justify-center p-8">
					<Icon className="text-default-400 mb-4" height={48} icon="lucide:cloud-off" width={48} />
					<p className="text-default-500">Weather data unavailable</p>
				</CardBody>
			</Card>
		);
	}

	const { main, wind, weather } = currentWeather;

	return (
		<motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
			<Card className="h-full">
				<CardBody className="p-6">
					<div className="flex flex-col items-center mb-4">
						<div className="w-24 h-24 flex items-center justify-center">
							<Icon className="text-primary" height={80} icon={getWeatherIcon(weather[0].icon)} width={80} />
						</div>
						<h2 className="text-4xl font-bold mt-2">{Math.round(main.temp)}°</h2>
						<p className="text-lg text-foreground-600 capitalize">{weather[0].description}</p>
					</div>

					<Divider className="my-4" />

					<div className="grid grid-cols-2 gap-4">
						<WeatherDetail icon="wi:thermometer" label="Feels Like" value={`${main.feels_like}°`} />
						<WeatherDetail icon="wi:humidity" label="Humidity" value={`${main.feels_like}%`} />
						<WeatherDetail icon="wi:strong-wind" label="Wind" value={`${wind.speed} km/h`} />
						<WeatherDetail icon="wi:barometer" label="Pressure" value={`${main.pressure} hPa`} />
					</div>
				</CardBody>
			</Card>
		</motion.div>
	);
};

export default CurrentWeatherComponent;
