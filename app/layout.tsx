import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
	description: siteConfig.description,
	icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body className={clsx("min-h-screen text-foreground bg-background font-sans antialiased", fontSans.variable)}>
				<Providers themeProps={{ attribute: "class" }}>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
