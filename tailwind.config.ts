import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        panel2: "rgb(var(--panel-2) / <alpha-value>)",
        borderc: "rgb(var(--border) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        brand2: "rgb(var(--brand-2) / <alpha-value>)",
        textc: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
      },
      borderRadius: {
        brand: "var(--radius)",
      },
      boxShadow: {
        brand: "var(--shadow)",
      },
      maxWidth: {
        app: "var(--maxw)",
      },
    },
  },
  plugins: [],
} satisfies Config;
