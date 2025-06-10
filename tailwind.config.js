import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    layout: {
      dividerWeight: "1px",
      disabledOpacity: 0.45,
      fontSize: {
        tiny: "0.75rem",   // 12px
        small: "0.875rem", // 14px
        medium: "0.9375rem", // 15px
        large: "1.125rem", // 18px
      },
      lineHeight: {
        tiny: "1rem",
        small: "1.25rem",
        medium: "1.5rem",
        large: "1.75rem",
      },
      radius: {
        small: "6px",
        medium: "8px",
        large: "12px",
      },
      borderWidth: {
        small: "1px",
        medium: "1px",
        large: "2px",
      },
    },
    themes: {
      light: {
        colors: {
          "primary": {
            "50": "#e6f1fe",
            "100": "#cce3fd",
            "200": "#99c7fb",
            "300": "#66aaf9",
            "400": "#338ef7",
            "500": "#006FEE",
            "600": "#005bc4",
            "700": "#004493",
            "800": "#002e62",
            "900": "#001731",
            "DEFAULT": "#006FEE",
            "foreground": "#fff"
          }
        }
      },
      dark: {
        colors: {
          background: {
            DEFAULT: "#0f172a"
          },
          content1: {
            DEFAULT: "#1e293b",
            foreground: "#f8fafc"
          },
          content2: {
            DEFAULT: "#334155",
            foreground: "#f1f5f9"
          },
          content3: {
            DEFAULT: "#475569",
            foreground: "#e2e8f0"
          },
          content4: {
            DEFAULT: "#64748b",
            foreground: "#cbd5e1"
          },
          "primary": {
            "50": "#001731",
            "100": "#002e62",
            "200": "#004493",
            "300": "#005bc4",
            "400": "#006FEE",
            "500": "#338ef7",
            "600": "#66aaf9",
            "700": "#99c7fb",
            "800": "#cce3fd",
            "900": "#e6f1fe",
            "DEFAULT": "#338ef7",
            "foreground": "#fff"
          }
        }
      }
    }
  })],
}

module.exports = config;