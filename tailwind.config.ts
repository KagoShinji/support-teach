import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        brand: {
          indigo: "#1C1917",
          violet: "#44403C",
          coral: "#CA8A04",
          light: "#FAFAF9",
          text: "#0C0A09",
        }
      }
    },
  },
  plugins: [],
} satisfies Config
