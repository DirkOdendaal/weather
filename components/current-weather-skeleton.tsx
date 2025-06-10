import { Card, CardBody, Skeleton, Divider } from "@heroui/react";
import { FC } from "react";

const CurrentWeatherSkeleton: FC = () => {
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

export default CurrentWeatherSkeleton;
