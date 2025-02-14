import React, { FC } from "react";

import { Location } from "@/interfaces/Location";
import { WeatherConditions } from "@/interfaces/WeatherConditions";
import axios from "axios";
import Image from "next/image";

import { Paper, Stack, Typography } from "@mui/material";

import { capitalizeWords } from "@/lib/Helpers";

/**
 * Current weather component.
 * @returns the current weather component.
 */
const CurrentWeather: FC = async () => {
  const locationResponse = (await axios.get<Array<Location>>("http://localhost:3000/api/location?cityName=Leusden"))
    .data;

  const weather: WeatherConditions = await (
    await axios.get(`http://localhost:3000/api/weather?lat=${locationResponse[0].lat}&lon=${locationResponse[0].lon}`)
  ).data;

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 1 }}>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography variant="h4">{locationResponse[0].name}</Typography>
        <Image
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          width={100}
          height={100}
          alt={weather.weather[0].description}
        />
        <Typography variant="h4">{weather.main.temp.toFixed(0)}°</Typography>
        <Typography variant="h6">{capitalizeWords(weather.weather[0].description)}</Typography>
        <Typography variant="h6">
          {weather.main.temp_min.toFixed(0)} / {weather.main.temp_max.toFixed(0)}° Feels like{" "}
          {weather.main.feels_like.toFixed(0)}°
        </Typography>
        <Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
        <Typography variant="body1">Wind Speed: {weather.wind.speed} m/s</Typography>
      </Stack>
    </Paper>
  );
};

export default CurrentWeather;
