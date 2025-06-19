import { LanguageConfig } from "@/types/languages";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Weather",
	description:
		"This is a weather app that provides current weather conditions and forecasts based on your location by default or a specified location.",
};

export const languageConfigs: Array<LanguageConfig> = [
	{
		languageCode: "en",
		languageName: "English",
		displayTexts: {
			title: "Weather",
			toggleDarkMode: "Toggle Dark Mode",
			searchPlaceholder: "Search a location",
			settingsString: "Settings",
			languageLabel: "Language",
			weatherLocationHeader: "Weather in {location}",
		},
		languageOptions: [
			{ value: "en", label: "English" },
			{ value: "nl", label: "Dutch" },
		],
	},
	{
		languageCode: "nl",
		languageName: "Nederlands",
		displayTexts: {
			title: "Weer",
			toggleDarkMode: "Donkere modus in-/uitschakelen",
			searchPlaceholder: "Zoek een locatie",
			settingsString: "Instellingen",
			languageLabel: "Taal",
			weatherLocationHeader: "Weer in {location}",
		},
		languageOptions: [
			{ value: "en", label: "Engels" },
			{ value: "nl", label: "Nederlands" },
		],
	},
];
