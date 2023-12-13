import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#2F80ED",
          200: "#4F4F4F",
          300: "#828282",
          400: "#E0E0E0",
        },
        indicator: {
          100: "#F8B76B",
          200: "#8785FF",
          300: "#EB5757",
          400: "#F2C94C",
        },
        chats: {
          100: "#FCEED3",
          200: "#E5A443",
          300: "#EEDCFF",
          400: "#9B51E0",
          500: "#D2F2EA",
          600: "#43B78D",
        },
        stickers: {
          100: "#E9F3FF",
          200: "#FDCFA4",
          300: "#F9E9C3",
          400: "#AFEBDB",
          500: "#CBF1C2",
          600: "#CFCEF9",
          700: "#F9E0FD",
        },
      },
    },
  },
  plugins: [],
};
export default config;
