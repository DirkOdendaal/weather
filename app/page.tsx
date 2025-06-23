"use client";

import CurrentWeatherComponent from "@/components/current-weather";
import ForecastWeek from "@/components/forecast-week";
import Navbar from "@/components/navbar";
import { useAppContext } from "@/context-providers/application-provider";
import { useWeatherContext } from "@/context-providers/weather-provider";
import { getFormattedDate } from "@/utils/utils";
import { motion } from "framer-motion";
import React from "react";

const Home = () => {
	const { error, locationName } = useWeatherContext();
	const { languageConfig } = useAppContext();

	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<main className="container mx-auto px-4 py-8 max-w-6xl">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-2xl md:text-3xl font-semibold mb-2">
						{languageConfig.displayTexts.weatherLocationHeader.replace("{location}", locationName)}
					</h1>
					<p className="text-foreground-500">{getFormattedDate(Date.now() / 1000, languageConfig.languageCode)}</p>
				</motion.div>

				{error ? (
					<div className="text-danger text-center py-10">{error}. Please try another location.</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-1">
							<CurrentWeatherComponent />
						</div>
						<div className="lg:col-span-2">
							<ForecastWeek />
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
