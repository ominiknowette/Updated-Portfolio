import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0f0f0f",
        card: {
          DEFAULT: "#181818",
          soft: "#1d1d1d",
          raised: "#202020",
        },
        ink: {
          DEFAULT: "#f5f5f5",
          soft: "#b4b4b4",
          muted: "#737373",
        },
        grid: {
          ink: "#f5f5f5",
          soft: "#b4b4b4",
          muted: "#737373",
          faint: "#515151",
        },
        accent: {
          blue: "#5c5df6",
          violet: "#7778ff",
        },
      },
      borderRadius: {
        card: "20px",
        "card-sm": "18px",
        "card-lg": "22px",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
        "card-hover": "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 60px -20px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #5b7cfa 0%, #8b5cf6 100%)",
        "grain": "url('/grain.svg')",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
