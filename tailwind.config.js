/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'roboto-slab': ['Roboto Slab', 'serif'],
      'times-new-roman': ['Times New Roman', 'serif'],
    },
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["lemonade"],
  }
}