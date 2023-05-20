/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../packages/ux/elements/**/*.{js,jsx,ts,tsx}",
    "../packages/ux/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/views/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-radix')()],
}