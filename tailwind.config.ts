import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        card: "var(--card)",
        border: "var(--border)",
        border2: "var(--border2)",
        fg: "var(--fg)",
        fg2: "var(--fg2)",
        fg3: "var(--fg3)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        accentbg: "var(--accentbg)",
        accentborder: "var(--accentborder)",
        purple: "var(--purple)",
        purplebg: "var(--purplebg)",
        amber: "var(--amber)",
        red: "var(--red)",
        blue: "var(--blue)",
      },
      fontFamily: {
        instrument: ["var(--font-instrument-serif)"],
        mono: ["var(--font-dm-mono)"],
        geist: ["var(--font-geist-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
