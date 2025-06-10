export const getFormattedDate = (timestamp: number): string => {
	return new Date(timestamp * 1000).toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
};
