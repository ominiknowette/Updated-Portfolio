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
        base: "#0b0b0c",
        card: {
          DEFAULT: "#151515",
          soft: "#181818",
          raised: "#1c1c1f",
        },
        ink: {
          DEFAULT: "#ffffff",
          soft: "#d4d4d8",
          muted: "#8a8a8f",
        },
        accent: {
          blue: "#5b7cfa",
          violet: "#8b5cf6",
        },
      },
      borderRadius: {
        card: "28px",
        "card-sm": "22px",
        "card-lg": "32px",
      },
      fontFamily: {
        display: ["var(--font-body)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
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
