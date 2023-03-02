/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#172028",
        "white": "#ffffff",
        "aqua": "#5fd7cb"
      }
    },
  },
  plugins: [],
}