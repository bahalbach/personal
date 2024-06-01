import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: "class", // or 'media' or 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      // TODO: colors
      background: "var(--background-color)",
      card: "var(--card-color)",
      icon: "var(--icon-color)",
      separator: "var(--separator-color)",
      bodyText: "var(--body-text-color)",
      standoutText: "var(--standout-text-color)",
      midText: "var(--mid-text-color)",
      headerText: "var(--header-text-color)",
      subtitle: "var(--subtitle-text-color)",
      title: "var(--title-text-color)",
      theme: "var(--theme-color)",
      themeDark: "var(--theme-dark-color)",
      themeLight: "var(--theme-light-color)",
      secondary: "var(--secondary-color)",
      error: "rgb(250 30 50)",
      yellow: "rgb(234 179 8)",
      white: "rgb(255 255 255)",
      black: "rgb(0 0 0)",
    },
    fontFamily: {
      // TODO: fonts
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    opacity: {
      dark: "var(--opacity-dark)",
      light: "var(--opacity-light)",
    },
  },
  plugins: [],
};
export default config;
