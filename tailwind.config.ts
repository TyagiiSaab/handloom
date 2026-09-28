import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A192F",
          950: "#060F1D",
          900: "#0A192F",
          800: "#112240",
          700: "#1B3252",
          600: "#274268",
        },
        ivory: {
          DEFAULT: "#FAF8F3",
          50: "#FAF8F3",
          100: "#F3EFE4",
          200: "#E7DFCC",
        },
        gold: {
          DEFAULT: "#C9A86A",
          50: "#FAF4E8",
          100: "#F2E6CC",
          200: "#E5D1A3",
          300: "#D9BC7F",
          400: "#C9A86A",
          500: "#B8944F",
          600: "#97793A",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.25em" },
    },
  },
  plugins: [],
};

export default config;
