import React, { FC } from "react";

import { Stack, Typography } from "@mui/material";

const CurrentWeather: FC = async () => {
  const weather = {
    coord: { lon: 5.4171, lat: 52.1188 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    base: "stations",
    main: {
      temp: 3.33,
      feels_like: 3.33,
      temp_min: 3.33,
      temp_max: 3.33,
      pressure: 1022,
      humidity: 66,
      sea_level: 1022,
      grnd_level: 1021,
    },
    visibility: 10000,
    wind: { speed: 1.33, deg: 273, gust: 1.32 },
    clouds: { all: 2 },
    dt: 1737292450,
    sys: {
      type: 2,
      id: 265550,
      country: "NL",
      sunrise: 1737272156,
      sunset: 1737302510,
    },
    timezone: 3600,
    id: 2751688,
    name: "Gemeente Leusden",
    cod: 200,
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} padding={2}>
      <Typography variant="h4">{weather.name}</Typography>
      <Typography variant="h6">{weather.weather[0].description}</Typography>
      <Typography variant="h4">{weather.main.temp.toFixed(0)}°C</Typography>
      <Typography variant="h4">
        {weather.main.temp_min.toFixed(0)}/{weather.main.temp_max.toFixed(0)}°
      </Typography>
      <Typography variant="h4">Feels like {weather.main.feels_like.toFixed(0)}°</Typography>
    </Stack>
  );
};

export default CurrentWeather;

