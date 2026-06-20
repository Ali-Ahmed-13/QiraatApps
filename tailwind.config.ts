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
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
        },
        paper: {
          light: "#faf6ee", // Warm creamy beige for comfortable long-term reading
          dark: "#0a120e",  // Deep night olive green for dark mode
        }
      },
    },
  },
  plugins: [],
};

export default config;
