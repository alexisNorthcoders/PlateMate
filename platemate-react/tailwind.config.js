/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        conifer: {
          50: '#f9fde8',
          100: '#f1fbcc',
          200: '#e2f79f',
          300: '#c7ed59',
          400: '#b4e239',
          500: '#96c81a',
          600: '#749f11',
          700: '#587912',
          800: '#476014',
          900: '#3c5116',
          950: '#1e2d06',
        },
      },
    },
  },
  plugins: [],
}



