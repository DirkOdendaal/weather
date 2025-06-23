import { LanguageCodes } from "@/enums/languages-codes";

export const getFormattedDate = (timestamp: number, language: LanguageCodes): string => {
	const locale = language === LanguageCodes.EN ? "en-US" : "nl-NL"; // Adjust based on your language codes

	return new Date(timestamp * 1000).toLocaleDateString(locale, {
		weekday: "long",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
};
