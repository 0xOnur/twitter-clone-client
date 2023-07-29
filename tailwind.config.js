/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
    maxHeight: {
      "90vh": "90vh",
    },
    extend: {
      gridTemplateColumns: {
        'chat': 'auto 1fr auto',
        'content': 'auto 1fr 1fr'
      },
      margin: {
        "2px": "2px",
        "10px": "10px",
      },
      width: {
        "275px": "275px",
        "52px": "52px",
        "88px": "88px",
        "290px": "290px",
        "350px": "350px",
        "90%": "90%",
      },
      height: {
        "52px": "52px",
        "650px": "650px",
      },
      minWidth: {
        "32px": "32px",
        "52px": "52px",
        "88px": "88px",
        "290px": "290px",
      },
      minHeight: {
        "52px": "52px",
        "510px": "510px",
        "400px": "400px"
      },
      maxWidth: {
        "350px": "350px",
        "600px": "600px",
        "900px": "900px",
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
          tweetHover: "#f7f7f7",
          defaultCover: "rgb(207, 217, 222)",
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
  plugins: [
    require("daisyui"),
  ],
  daisyui : {
    themes:false,
  }
}