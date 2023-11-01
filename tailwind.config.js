/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    maxHeight: {
      "90vh": "90vh",
    },
    extend: {
      gridTemplateColumns: {
        'chat': 'auto 1fr auto auto',
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
        blue: {
          base: "hsl(203, 89%, 53%)",
        },
        red: {
          base: "rgb(244 33 46)",
        },
        green: {
          base: "hsl(160, 100%, 36%)",
        },
        yellow: {
          base: "#FFAD1F",
        },
        black: "#14171A",
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui : {
    themes:false,
  }
}