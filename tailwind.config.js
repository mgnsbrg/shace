/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00276b',
        secondary: '#ff7945',
        accent: '#ff7945',
      },
    },
  },
  plugins: [],
}
