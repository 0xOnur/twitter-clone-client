/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  options: {
    safelist: [
      "primary-base"
    ],
  },
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          base: "hsl(203, 89%, 53%)",
          dark: "hsl(203, 89%, 46%)",
          light: "hsl(203, 89%, 96%)",
          extraLight: "hsl(203, 84%, 95%)",
        },
        gray: {
          dark: "#657786",
          light: "#AAB8C2",
          extraLight: "rgba(15, 20, 25, 0.1)",
          lightest: "#e7e7e8",
          rightbar: '#f7f9f9',
          dropdown: '#f7f9f9',
          trendsHover: "#eff1f1",
        },
        yellow: {
          base: "#FFAD1F",
        },
        black: "#14171A",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui : {
    themes:false,
  }
}