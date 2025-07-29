/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#063684",
          800: "#0950C3",
          700: "#0B64F4",
          600: "#3B82F6",
          500: "#5995F7",
          400: "#76A8F9",
          300: "#A7C7FB",
          200: "#C4DAFC",
          100: "#EBF3FE",
        },
        grey: {
          900: "#32373C",
          800: "#465055",
          700: "#828C96",
          600: "#AAB4B9",
          500: "#CDD2D7",
          400: "#DCE1E6",
          300: "#E6EBEB",
          200: "#F0F0F5",
          100: "#F5F5FA",
        },
        accent:{
          green: {
            700: "#0F4141",
            600: "#19645A",
            500: "#289187",
            400: "#3CAAA0",
            300: "#6ED7D2",
            200: "#A5BEBB",
            100: "#E6FFFA",
          },
          yellow: {
            700: "#5A460F",
            600: "#8C691E",
            500: "#C8A53C",
            400: "#F0C864",
            300: "#F9E19B",
            200: "#FAF0D7", 
            100: "#FFFFF0", 
          },
          red: {
            700: "#5F1414",
            600: "#871919",
            500: "#B41E1E", 
            400: "#DC2D2D",
            300: "#E16464",
            200: "#F5AAAA", 
            100: "#FFF5F5", 
          },
        }
      },
    },
  },
  plugins: [],
}

