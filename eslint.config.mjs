import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js"
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslint.configs.recommended,
  jsdoc.configs["flat/recommended-typescript-error"],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: ["node_modules/", "dist/", "build/", ".next/", ".vercel/", "coverage/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}", "**/*.test.{js,mjs,cjs,ts,jsx,tsx}"],

    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "curly": ["error", "multi-line"],
      "dot-notation": "error",
      "jsdoc/require-description": "error",
      "jsdoc/require-jsdoc": [
        "error",
        {
          "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true,
            "ArrowFunctionExpression": true,
            "FunctionExpression": true
          }
        }
      ],
      "no-console": "error",
      "no-duplicate-imports": "error",
      "no-floating-decimal": "error",
      "no-lonely-if": "error",
      "no-prototype-builtins": "off",
      "no-unneeded-ternary": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "return" }
      ],
      "prefer-destructuring": [
        "error",
        {
          "VariableDeclarator": {
            "array": false,
            "object": true
          },
          "AssignmentExpression": {
            "array": true,
            "object": false
          }
        },
        {
          "enforceForRenamedProperties": false
        }
      ],
      "prefer-template": "error",
      "react-hooks/exhaustive-deps": "off",
      "yoda": "error",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/array-type": ["error", { "default": "generic" }],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          "allowExpressions": true,
          "allowTypedFunctionExpressions": true
        }
      ],
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        {
          "allowArgumentsExplicitlyTypedAsAny": true
        }
      ],
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/restrict-template-expressions": "off"
    }
  },
  {
    files: ["**/*.test.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "jsdoc/require-description": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/check-tag-names": "off",
    },
  },
];

export default eslintConfig;
