import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#07080A", panel: "#101216", line: "#1C1F27", mute: "#8B909A", sol: "#9945FF", mint: "#14F195" },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
      boxShadow: { glow: "0 0 80px rgba(153, 69, 255, 0.12)" },
    },
  },
  plugins: [],
};
export default config;
