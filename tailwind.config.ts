import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Nohemi", "sans-serif"],
        text: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#EFFEF6",
          100: "#D9FFEC",
          200: "#B5FDD9",
          300: "#7CF9BC",
          400: "#3CEC97",
          500: "#13E07E",
          600: "#08B160",
          700: "#0B8A4E",
          800: "#0E6D41",
          900: "#0E5938",
          950: "#01321D",
        },
        secondary: {
          600: "#404045",
          700: "#36363B",
          800: "#2B2B30",
          900: "#18181B",
        },
        neutral: {
          50: "#F6F6F5",
          100: "#E7E7E6",
          200: "#D1D1D0",
          300: "#B1B0AF",
          400: "#8A8A86",
          500: "#6F6F6B",
          600: "#5E5D5C",
          700: "#504F4E",
          800: "#464644",
          900: "#3D3D3C",
          950: "#252524",
        },
        status: {
          draft: "#FF8E2E",
          published: "#13E07E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
