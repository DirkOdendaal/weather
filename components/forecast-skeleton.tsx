import { Card, CardHeader, Skeleton, Divider, CardBody } from "@heroui/react";
import { FC, Fragment } from "react";

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

export default ForecastSkeleton;
