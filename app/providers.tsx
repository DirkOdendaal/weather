"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { AppProvider } from "@/context-providers/application-provider";
import { ToastProvider } from "@heroui/react";
import { WeatherProvider } from "@/context-providers/weather-provider";

export interface ProvidersProps {
	children: ReactNode;
	themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
	}
}

export const Providers = ({ children, themeProps }: ProvidersProps) => {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			<ToastProvider />
			<NextThemesProvider {...themeProps}>
				<AppProvider>
					<WeatherProvider location="Leusden">{children}</WeatherProvider>
				</AppProvider>
			</NextThemesProvider>
		</HeroUIProvider>
	);
};
