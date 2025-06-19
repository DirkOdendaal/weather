export interface LanguageConfig {
	languageCode: string;
	languageName: string;
	displayTexts: {
		title: string;
		toggleDarkMode: string;
		searchPlaceholder: string;
		settingsString: string;
		languageLabel: string;
		weatherLocationHeader: string;
	};
	languageOptions: Array<{
		value: string;
		label: string;
	}>;
}
