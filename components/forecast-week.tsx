import React, { FC, Fragment } from "react";
import { Card, CardBody, CardHeader, Divider, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { ForecastType } from "@/types/weather";

interface ForecastWeekProps {
  forecast: ForecastType[] | null;
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
          <Icon
            className="text-default-400 mb-4"
            height={48}
            icon="lucide:calendar-x"
            width={48}
          />
          <p className="text-default-500">Forecast data unavailable</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">7-Day Forecast</h2>
        <p className="text-sm text-foreground-500">Daily weather forecast</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-4">
          {forecast.map((day, index) => (
            <motion.div
              key={day.date}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ForecastDay day={day} isFirst={index === 0} />
              {index < forecast.length - 1 && <Divider className="my-4" />}
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

const ForecastDay: FC<{
  day: ForecastType;
  isFirst: boolean;
}> = ({ day, isFirst }) => {
  const dayName = new Date(day.date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <Icon
            className="text-primary"
            height={36}
            icon={getWeatherIcon(day.icon)}
            width={36}
          />
        </div>
        <div>
          <p className="font-medium">
            {isFirst ? "Today" : dayName}
            <span className="text-foreground-500 text-sm ml-2">
              {formattedDate}
            </span>
          </p>
          <p className="text-sm text-foreground-500 capitalize">
            {day.condition}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Icon className="text-primary" icon="lucide:droplets" width={14} />
          <span className="text-sm">{day.precipitation}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{day.minTemp}°</span>
          <div className="w-16 h-1.5 rounded-full bg-default-100 relative">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-primary"
              style={{
                width: `${calculateTempPercentage(day.minTemp, day.maxTemp, day.minTemp)}%`,
              }}
            />
            <div
              className="absolute top-0 right-0 h-full rounded-full bg-primary"
              style={{
                width: `${calculateTempPercentage(day.minTemp, day.maxTemp, day.maxTemp)}%`,
              }}
            />
          </div>
          <span className="font-medium">{day.maxTemp}°</span>
        </div>
      </div>
    </div>
  );
};

const ForecastSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-1">
        <Skeleton className="h-6 w-40 rounded-lg" />
        <Skeleton className="h-4 w-60 rounded-lg" />
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-4">
          {[...Array(7)].map((_, index) => (
            <Fragment key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 rounded-lg" />
                    <Skeleton className="h-4 w-24 rounded-lg mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-10 rounded-lg" />
                  <Skeleton className="h-5 w-24 rounded-lg" />
                </div>
              </div>
              {index < 6 && <Divider className="my-4" />}
            </Fragment>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

function getWeatherIcon(condition: string): string {
  const iconMap: Record<string, string> = {
    "01d": "lucide:sun", // clear sky day
    "01n": "lucide:moon", // clear sky night
    "02d": "lucide:cloud-sun", // few clouds day
    "02n": "lucide:cloud-moon", // few clouds night
    "03d": "lucide:cloud", // scattered clouds
    "03n": "lucide:cloud",
    "04d": "lucide:clouds", // broken clouds
    "04n": "lucide:clouds",
    "09d": "lucide:cloud-drizzle", // shower rain
    "09n": "lucide:cloud-drizzle",
    "10d": "lucide:cloud-rain", // rain
    "10n": "lucide:cloud-rain",
    "11d": "lucide:cloud-lightning", // thunderstorm
    "11n": "lucide:cloud-lightning",
    "13d": "lucide:snowflake", // snow
    "13n": "lucide:snowflake",
    "50d": "lucide:cloud-fog", // mist
    "50n": "lucide:cloud-fog",
  };

  return iconMap[condition] || "lucide:cloud";
}

function calculateTempPercentage(
  min: number,
  max: number,
  value: number,
): number {
  const range = max - min;

  if (range === 0) return 50;
  const percentage = ((value - min) / range) * 100;

  return Math.max(10, Math.min(percentage, 90)); // Ensure values are between 10% and 90%
}

export default ForecastWeek;
