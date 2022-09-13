/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        "nlw-gradiant": "linear-gradient(89.86deg, #9572FC 5.00%, #43E7AD 70%, #E1D55D 90.66%);",
        "game-gradiant": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
        galaxy: "url('/background-galaxy.png')",
      }
    },
  },
  plugins: [],
}
