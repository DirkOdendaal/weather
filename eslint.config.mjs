import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    ".now/*",
    "**/*.css",
    "**/.changeset",
    "**/dist",
    "esm/*",
    "public/*",
    "tests/*",
    "scripts/*",
    "**/*.config.js",
    "**/.DS_Store",
    "**/node_modules",
    "**/coverage",
    "**/.next",
    "**/build",
    "!**/.commitlintrc.cjs",
    "!**/.lintstagedrc.cjs",
    "!**/jest.config.js",
    "!**/plopfile.js",
    "!**/react-shim.js",
    "!**/tsup.config.ts",
]), {
    extends: fixupConfigRules(compat.extends(
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@next/next/recommended",
    )),

    plugins: {
        react: fixupPluginRules(react),
        "unused-imports": unusedImports,
        import: fixupPluginRules(_import),
        "@typescript-eslint": typescriptEslint,
        "jsx-a11y": fixupPluginRules(jsxA11Y),
        prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    files: ["**/*.ts", "**/*.tsx"],

    rules: {
        "no-console": "warn",
        "react/prop-types": "off",
        "react/function-component-definition": [
            "error",
            {
                "namedComponents": "arrow-function",
                "unnamedComponents": "arrow-function"
            }
        ],
        "import/no-default-export": "off", // Allow default exports
        "import/prefer-default-export": "error", // Prefer default export if only one export
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/interactive-supports-focus": "warn",
        "prettier/prettier": "warn",
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "no-restricted-syntax": [
            "error",
            {
                "selector": "MemberExpression[object.name='React'][property.name='useState']",
                "message": "Use the named import 'useState' instead of 'React.useState'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useEffect']",
                "message": "Use the named import 'useEffect' instead of 'React.useEffect'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useContext']",
                "message": "Use the named import 'useContext' instead of 'React.useContext'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useRef']",
                "message": "Use the named import 'useRef' instead of 'React.useRef'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useMemo']",
                "message": "Use the named import 'useMemo' instead of 'React.useMemo'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useCallback']",
                "message": "Use the named import 'useCallback' instead of 'React.useCallback'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useReducer']",
                "message": "Use the named import 'useReducer' instead of 'React.useReducer'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='useLayoutEffect']",
                "message": "Use the named import 'useLayoutEffect' instead of 'React.useLayoutEffect'."
            },
            {
                "selector": "MemberExpression[object.name='React'][property.name='FC']",
                "message": "Use the named import 'FC' instead of 'React.FC'."
            },
        ],

        "@typescript-eslint/no-unused-vars": ["warn", {
            args: "after-used",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_.*?$",
        }],
        "react/self-closing-comp": "warn",
        "react/jsx-sort-props": ["warn", {
            callbacksLast: true,
            shorthandFirst: true,
            noSortAlphabetically: false,
            reservedFirst: true,
        }],
        "padding-line-between-statements": ["warn", {
            blankLine: "always",
            prev: "*",
            next: "return",
        }, {
                blankLine: "always",
                prev: ["const", "let", "var"],
                next: "*",
            }, {
                blankLine: "any",
                prev: ["const", "let", "var"],
                next: ["const", "let", "var"],
            }],
    },
}]);