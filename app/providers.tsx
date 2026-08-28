"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useState } from "react";
import { AppProvider } from "@/context-providers/application-provider";
import { ToastProvider } from "@heroui/react";
import { WeatherProvider } from "@/context-providers/weather-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 30 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <WeatherProvider>{children}</WeatherProvider>
          </AppProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
