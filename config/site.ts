import { LanguageCodes } from "@/enums/languages-codes";
import { LanguageConfig } from "@/types/languages";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Weather",
	description:
		"This is a weather app that provides current weather conditions and forecasts based on your location by default or a specified location.",
};

export const languageConfigs: Array<LanguageConfig> = [
	{
		languageCode: LanguageCodes.EN,
		languageName: "English",
		displayTexts: {
			title: "Weather",
			toggleDarkMode: "Toggle Dark Mode",
			searchPlaceholder: "Search a location",
			settingsString: "Settings",
			languageLabel: "Language",
			weatherLocationHeader: "Weather in {location}",
			weatherForecastHeader: "{days}-Day Forecast",
			weatherForecastSubHeader: "Daily weather forecast",
			feelsLike: "Feels Like",
			humidity: "Humidity",
			windSpeed: "Wind Speed",
			pressure: "Pressure",
			posibilityOfPrecipitation: "Chance of Precipitation",
			minTemperature: "Min Temperature",
			maxTemperature: "Max Temperature",
		},
		languageOptions: [
			{ value: "en", label: "English" },
			{ value: "nl", label: "Dutch" },
		],
	},
	{
		languageCode: LanguageCodes.NL,
		languageName: "Nederlands",
		displayTexts: {
			title: "Weer",
			toggleDarkMode: "Donkere modus in-/uitschakelen",
			searchPlaceholder: "Zoek een locatie",
			settingsString: "Instellingen",
			languageLabel: "Taal",
			weatherLocationHeader: "Weer in {location}",
			weatherForecastHeader: "{days}-Daagse Voorspelling",
			weatherForecastSubHeader: "Dagelijkse weersvoorspelling",
			feelsLike: "Voelt als",
			humidity: "Vochtigheid",
			windSpeed: "Wind Snelheid",
			pressure: "Luchtdruk",
			posibilityOfPrecipitation: "Kans op Neerslag",
			minTemperature: "Min Temperatuur",
			maxTemperature: "Max Temperatuur",
		},
		languageOptions: [
			{ value: "en", label: "Engels" },
			{ value: "nl", label: "Nederlands" },
		],
	},
];
