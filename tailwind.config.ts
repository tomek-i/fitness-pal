import type { Config } from "tailwindcss"

/** @type {import('tailwindcss').Config} */
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
        background: "var(--background)",
        foreground: "var(--foreground)",
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropFilter: {
        none: "none",
        sm: "blur(4px)",
        md: "blur(8px)",
        lg: "blur(12px)",
        xl: "blur(16px)",
      },
      variants: {
        backdropFilter: ["responsive"],
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
}
export default config
