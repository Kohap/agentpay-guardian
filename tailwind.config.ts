import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "#0d1b2f",
        line: "#1d3658",
        electric: "#38bdf8",
        glow: "#60a5fa",
      },
      boxShadow: {
        glow: "0 18px 70px rgba(56, 189, 248, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
