import React, { FC } from "react";

import { Location } from "@/interfaces/Location";
import { WeatherForecast } from "@/interfaces/WeatherForecast";
import axios from "axios";
import Image from "next/image";

import { Box, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { capitalizeWords, getDayOfWeek } from "@/lib/Helpers";

/**
 * Forecast component
 * @returns Forecast component
 */
const Forecast: FC = async () => {
  const locationResponse = (await axios.get<Array<Location>>("http://localhost:3000/api/location?cityName=Leusden"))
    .data;

  const forecastResponse = (
    await axios.get<WeatherForecast>(
      `http://localhost:3000/api/weather/forecast?lat=${locationResponse[0].lat}&lon=${locationResponse[0].lon}`
    )
  ).data;

  const groupedForecasts = forecastResponse.list.reduce(
    (acc, forecast) => {
      const date = new Date(forecast.dt_txt).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);

      return acc;
    },
    {} as Record<string, typeof forecastResponse.list>
  );

  return (
    <Stack>
      {Object.entries(groupedForecasts).map(([date, forecasts]) => (
        <Paper elevation={3} sx={{ padding: 2, margin: 1 }} key={date}>
          <Typography variant="h6" gutterBottom>{`${getDayOfWeek(date)}, ${date}`}</Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Grid container direction="row" wrap="nowrap">
              {forecasts.map((forecast) => (
                <Grid key={forecast.dt} sx={{ minWidth: 120, maxWidth: 120 }}>
                  <Stack justifyContent={"center"} alignItems={"center"} paddingBottom={1}>
                    <Typography variant="body1">
                      {new Date(forecast.dt_txt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Typography>
                    <Image
                      src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
                      width={50}
                      height={50}
                      alt={forecast.weather[0].description}
                    />
                    <Typography variant="h6">
                      {forecast.main.temp_min.toFixed(0)} / {forecast.main.temp_max.toFixed(0)}°
                    </Typography>
                    <Typography variant="body2" align="center">
                      {capitalizeWords(forecast.weather[0].description)}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default Forecast;
