import { LanguageCodes } from "@/enums/languages-codes";

export interface LanguageConfig {
	languageCode: LanguageCodes;
	languageName: string;
	displayTexts: {
		title: string;
		toggleDarkMode: string;
		searchPlaceholder: string;
		settingsString: string;
		languageLabel: string;
		weatherLocationHeader: string;
		weatherForecastHeader: string;
		weatherForecastSubHeader: string;
		feelsLike: string;
		humidity: string;
		windSpeed: string;
		pressure: string;
		posibilityOfPrecipitation: string;
		minTemperature: string;
		maxTemperature: string;
	};
	languageOptions: Array<{
		value: string;
		label: string;
	}>;
}
