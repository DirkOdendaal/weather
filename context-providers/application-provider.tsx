import { languageConfigs } from "@/config/site";
import { LanguageCodes } from "@/enums/languages-codes";
import { Units } from "@/enums/unit";
import { LanguageConfig } from "@/types/languages";
import { addToast } from "@heroui/react";
import React, { createContext, useContext, ReactNode, useMemo, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const LANGUAGE_STORAGE_KEY = "weather:language";
const UNIT_STORAGE_KEY = "weather:unit";

const defaultLanguageConfig = languageConfigs.find((config) => config.languageCode === LanguageCodes.EN)!;

interface AppContextType {
  languageConfig: LanguageConfig;
  unit: Units;
  changeLanguage: (language: LanguageCodes) => void;
  changeUnitSystem: (unit: Units) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [languageCode, setLanguageCode] = useLocalStorage<LanguageCodes>(LANGUAGE_STORAGE_KEY, LanguageCodes.EN, {
    initializeWithValue: false,
  });
  const [unit, setUnit] = useLocalStorage<Units>(UNIT_STORAGE_KEY, Units.Metric, { initializeWithValue: false });

  const languageConfig = useMemo(
    () => languageConfigs.find((config) => config.languageCode === languageCode) ?? defaultLanguageConfig,
    [languageCode],
  );

  const changeLanguage = useCallback(
    (nextLanguageCode: LanguageCodes) => {
      const nextConfig = languageConfigs.find((config) => config.languageCode === nextLanguageCode);

      if (!nextConfig) {
        addToast({
          title: "Language Configuration Error",
          description: `Language configuration for '${nextLanguageCode}' not found.`,
          color: "danger",
        });

        return;
      }

      setLanguageCode(nextLanguageCode);
    },
    [setLanguageCode],
  );

  const changeUnitSystem = useCallback(
    (nextUnit: Units) => {
      setUnit(nextUnit);
    },
    [setUnit],
  );

  const context = useMemo(
    () => ({
      languageConfig,
      unit,
      changeLanguage,
      changeUnitSystem,
    }),
    [languageConfig, unit, changeLanguage, changeUnitSystem],
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
