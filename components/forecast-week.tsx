import React, { FC } from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { ForecastListItem } from "@/types/weather";
import ForecastSkeleton from "./forecast-skeleton";
import ForecastDay from "./forecast-day";

interface ForecastWeekProps {
	forecast: Array<ForecastListItem> | null;
	isLoading: boolean;
}

const ForecastWeek: FC<ForecastWeekProps> = ({ forecast, isLoading }) => {
	if (isLoading) {
		return <ForecastSkeleton />;
	}

	if (!forecast || forecast.length === 0) {
		return (
			<Card>
				<CardBody className="flex flex-col items-center justify-center p-8">
					<Icon className="text-default-400 mb-4" height={48} icon="lucide:calendar-x" width={48} />
					<p className="text-default-500">Forecast data unavailable</p>
				</CardBody>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold">{forecast.length}-Day Forecast</h2>
				<p className="text-sm text-foreground-500">Daily weather forecast</p>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="space-y-4">
					{forecast.map((forecastItem, index) => (
						<motion.div
							key={forecastItem.dt}
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.3, delay: index * 0.05 }}
						>
							<ForecastDay day={forecastItem} />
							{index < forecast.length - 1 && <Divider className="my-4" />}
						</motion.div>
					))}
				</div>
			</CardBody>
		</Card>
	);
};

export default ForecastWeek;
