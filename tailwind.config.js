/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height:{
        '128':'32rem',      
        "90p":"90%",
        "10p":"10%"
      }
    },
  },
  plugins: [],
}