/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: {
          bg: "#031434",
          light_green: "#A9FFE0",
          light_blue: "#A9C1FF",
          light_red: "#FFA9EC",
          yellow: "#FDFFA9",
          active: "#0A74DC",
          shadow: "#E5E5E5",
          notification: "#333758",
          name: "#303B54",
          kebab: "#C4C4C4",
          gray: "#A4A7B7",
          card_text_color: "#434854",
          card_green_color: "#00992B",
        },
      },
    },

    plugins: [],
  },
};
