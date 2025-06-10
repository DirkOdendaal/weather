import { Icon } from "@iconify/react";
import React, { FC } from "react";

const WeatherDetail: FC<{
	icon: string;
	label: string;
	value: string;
}> = ({ icon, label, value }) => {
	return (
		<div className="flex items-center gap-2">
			<div className="p-2 rounded-md bg-default-100">
				<Icon className="text-default-600" fontSize={25} icon={icon} />
			</div>
			<div>
				<p className="text-xs text-foreground-500">{label}</p>
				<p className="text-sm font-medium">{value}</p>
			</div>
		</div>
	);
};

export default WeatherDetail;
