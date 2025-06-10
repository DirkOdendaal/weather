"use client";
import CurrentWeatherComponent from "@/components/current-weather";
import ForecastWeek from "@/components/forecast-week";
import Navbar from "@/components/navbar";
import useWeatherData from "@/hooks/use-weather-data";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("Leusden");
	const { currentWeather, forecast, isLoading, error } = useWeatherData(searchQuery);

	const handleSearch = (query: string) => {
		if (query.trim()) {
			setSearchQuery(query);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Navbar onSearch={handleSearch} />

			<main className="container mx-auto px-4 py-8 max-w-6xl">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-2xl md:text-3xl font-semibold mb-2">Weather in {searchQuery}</h1>
					<p className="text-foreground-500">
						{new Date().toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</motion.div>

				{error ? (
					<div className="text-danger text-center py-10">{error}. Please try another location.</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-1">
							<CurrentWeatherComponent currentWeather={currentWeather} isLoading={isLoading} />
						</div>
						<div className="lg:col-span-2">
							<ForecastWeek forecast={forecast} isLoading={isLoading} />
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
