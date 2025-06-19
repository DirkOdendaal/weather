import { languageConfigs } from "@/config/site";
import { Languages } from "@/enums/languages";
import { Units } from "@/enums/unit";
import { LanguageConfig } from "@/types/languages";
import { addToast } from "@heroui/react";
import React, { createContext, useReducer, useContext, ReactNode, useMemo } from "react";

interface AppState {
	languageConfig: LanguageConfig;
	unit: Units;
}

enum AppActionTypes {
	SetLanguage = "SET_LANGUAGE",
	SetUnit = "SET_UNIT",
}

type AppAction =
	| { type: AppActionTypes.SetLanguage; payload: LanguageConfig }
	| { type: AppActionTypes.SetUnit; payload: Units };

const initialState: AppState = {
	languageConfig: languageConfigs.find((config) => config.languageCode === "en")!, // Default to English
	unit: Units.Metric,
};

interface AppContextType extends AppState {
	changeLanguage: (language: Languages) => void;
}

const appReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case AppActionTypes.SetLanguage:
			return { ...state, languageConfig: action.payload };
		case AppActionTypes.SetUnit:
			return { ...state, unit: action.payload };
		default:
			return state;
	}
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const changeLanguage = (language: Languages) => {
		const languageConfig = languageConfigs.find((config) => config.languageCode === language);

		if (languageConfig) {
			dispatch({ type: AppActionTypes.SetLanguage, payload: languageConfig });
		} else {
			addToast({
				title: "Language Configuration Error",
				description: `Language configuration for ${language} not found.`,
				color: "danger",
			});
		}
	};

	const context = useMemo(
		() => ({
			languageConfig: state.languageConfig,
			unit: state.unit,
			changeLanguage,
		}),
		[state.languageConfig, state.unit],
	);

	return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}

	return context;
};
