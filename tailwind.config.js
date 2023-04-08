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
      transformOrigin: {
        "0": "0%",
      },
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
        red: {
          remove: "#fee8e9",
          removeText: "rgb(244 33 46)",
        },
        yellow: {
          base: "#FFAD1F",
        },
        black: "#14171A",
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [require("daisyui")],
  daisyui : {
    themes:false,
  }
}