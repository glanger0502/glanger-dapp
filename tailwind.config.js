/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../public/background.jpeg')"
      }
    },
    height: {
      "95v": "95vh",
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
}
