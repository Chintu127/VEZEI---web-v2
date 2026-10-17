import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vezei: {
          lime: "#C8FF3D",
          pink: "#FF4FA3",
          purple: "#5B3DF5",
          black: "#111111",
          dark: {
            DEFAULT: "#111111",
            surface: "#171717",
            card: "#1C1C1E",
            cardHover: "#242426",
            border: "#2A2A2E",
            subtle: "#141416",
          },
          light: {
            bg: "#F9FAFB",
            surface: "#FFFFFF",
            card: "#FFFFFF",
            border: "#E5E7EB",
            muted: "#F3F4F6",
          },
        },
      },
      fontFamily: {
        sans: [
          "Outfit",
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        "tactile-lime": "0 4px 0 #111111, 0 4px 14px rgba(200, 255, 61, 0.35)",
        "tactile-pink": "0 4px 0 #111111, 0 4px 14px rgba(255, 79, 163, 0.35)",
        "tactile-purple": "0 4px 0 #111111, 0 4px 14px rgba(91, 61, 245, 0.35)",
        "tactile-dark": "0 4px 0 #000000",
        "glow-lime": "0 0 25px rgba(200, 255, 61, 0.25)",
        "glow-pink": "0 0 25px rgba(255, 79, 163, 0.25)",
        "glow-purple": "0 0 25px rgba(91, 61, 245, 0.25)",
        "card-dark": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
