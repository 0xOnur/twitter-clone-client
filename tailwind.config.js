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
      margin: {
        "2px": "2px",
      },
      transformOrigin: {
        "0": "0%",
      },
      colors: {
        primary: {
          base: "hsl(203, 89%, 53%)",
          dark: "hsl(203, 89%, 46%)",
          light: "hsl(203, 89%, 96%)",
          extraLight: "hsl(203, 84%, 95%)",
          hover: "rgba(29, 155, 240, 0.1)",
        },
        gray: {
          dark: "#657786",
          light: "#AAB8C2",
          extraLight: "rgba(15, 20, 25, 0.1)",
          lightest: "#e7e7e8",
          rightbar: '#f7f9f9',
          dropdown: '#f7f9f9',
          trendsHover: "#eff1f1",
          tweetHover: "rgba(0, 0, 0, 0.03)"
        },
        red: {
          base: "hsl(332, 94%, 61%)",
          extraLight: "rgba(249, 24, 128, 0.1)",
          remove: "#fee8e9",
          removeText: "rgb(244 33 46)",
        },
        green: {
          base: "hsl(160, 100%, 36%)",
          extraLigt: "rgba(0, 186, 124, 0.1)",
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