import React from "react";
import { Card, CardBody, Divider, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { CurrentWeatherType } from "@/types/weather";

interface CurrentWeatherProps {
  currentWeather: CurrentWeatherType | null;
  isLoading: boolean;
  location: string;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  currentWeather,
  isLoading,
  location,
}) => {
  if (isLoading) {
    return <CurrentWeatherSkeleton />;
  }

  if (!currentWeather) {
    return (
      <Card className="h-full">
        <CardBody className="flex flex-col items-center justify-center p-8">
          <Icon
            className="text-default-400 mb-4"
            height={48}
            icon="lucide:cloud-off"
            width={48}
          />
          <p className="text-default-500">Weather data unavailable</p>
        </CardBody>
      </Card>
    );
  }

  const {
    temperature,
    condition,
    feelsLike,
    humidity,
    windSpeed,
    pressure,
    icon,
  } = currentWeather;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardBody className="p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <Icon
                className="text-primary"
                height={80}
                icon={getWeatherIcon(icon)}
                width={80}
              />
            </div>
            <h2 className="text-4xl font-bold mt-2">{temperature}°</h2>
            <p className="text-lg text-foreground-600 capitalize">
              {condition}
            </p>
          </div>

          <Divider className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <WeatherDetail
              icon="lucide:thermometer"
              label="Feels Like"
              value={`${feelsLike}°`}
            />
            <WeatherDetail
              icon="lucide:droplets"
              label="Humidity"
              value={`${humidity}%`}
            />
            <WeatherDetail
              icon="lucide:wind"
              label="Wind"
              value={`${windSpeed} km/h`}
            />
            <WeatherDetail
              icon="lucide:gauge"
              label="Pressure"
              value={`${pressure} hPa`}
            />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

const WeatherDetail: React.FC<{
  icon: string;
  label: string;
  value: string;
}> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-md bg-default-100">
        <Icon className="text-default-600" height={16} icon={icon} width={16} />
      </div>
      <div>
        <p className="text-xs text-foreground-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
};

const CurrentWeatherSkeleton: React.FC = () => {
  return (
    <Card className="h-full">
      <CardBody className="p-6">
        <div className="flex flex-col items-center mb-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-lg mt-2" />
          <Skeleton className="h-4 w-24 rounded-lg mt-2" />
        </div>

        <Divider className="my-4" />

        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div>
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-4 w-10 rounded-lg mt-1" />
              </div>
            </div>
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
