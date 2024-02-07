/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'myblack': "#14191F",
        'borderColor': "#0000001A",
      },
      backgroundImage: {
        'arrowDown': "url('img/arrow-down.svg')"
      }
    },
  },
  plugins: [],
}

