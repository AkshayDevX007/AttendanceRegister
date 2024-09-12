/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
      }
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "bumblebee"],
  },
  plugins: [require('daisyui'),],
}

