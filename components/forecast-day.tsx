import { ForecastListItem } from "@/types/weather";
import { getFormattedDate } from "@/utils/utils";
import { getWeatherIcon } from "@/utils/weather-utils";
import { Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { FC } from "react";

const ForecastDay: FC<{
	day: ForecastListItem;
}> = ({ day }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 flex items-center justify-center">
					<Icon className="text-primary" height={36} icon={getWeatherIcon(day.weather[0].icon)} width={36} />
				</div>
				<div>
					<p className="font-medium">{getFormattedDate(day.dt)}</p>
					<p className="text-sm text-foreground-500 capitalize">{day.weather[0].description}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Tooltip content="Posibility of Precipitation">
					<div className="flex items-center gap-1">
						<Icon className="text-primary" icon="wi:raindrops" width={30} />
						<span className="text-sm">{day.pop}%</span>
					</div>
				</Tooltip>
				<Tooltip content="Minimum Temperature">
					<span className="font-medium">{Math.round(day.main.temp_min)}°</span>
				</Tooltip>
				<Tooltip content="Maximum Temperature">
					<span className="font-medium">{Math.round(day.main.temp_max)}°</span>
				</Tooltip>
			</div>
		</div>
	);
};

export default ForecastDay;
