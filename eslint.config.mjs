import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript", "prettier"), {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}", "**/*.test.{js,mjs,cjs,ts,jsx,tsx}"],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "curly": ["error", "multi-line"],
    "dot-notation": "error",
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
  }
}];

export default eslintConfig;
