import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
	collectCoverageFrom: [
		"api/**/*.{js,ts,tsx}",
		"app/**/*.{js,ts,tsx}",
		"components/**/*.{js,ts,tsx}",
		"context-providers/**/*.{js,ts,tsx}",
		"enums/**/*.{js,ts}",
		"types/**/*.{js,ts}",
		"utils/**/*.{js,ts}",
		"config/**/*.{js,ts}",
		// exclutions
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/__tests__/**",
		"!**/coverage/**",
		"!app/layout.tsx",
		"!app/providers.tsx",
	],
};

export default createJestConfig(config);
