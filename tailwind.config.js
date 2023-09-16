/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "comida-fundo": "url('../images/fundoOrange.png')",
      }),
      backgroundSize: (theme) => ({
        "80%": "80%",
      }),
      backgroundPosition: (theme) => ({
        "top-left" : "0px left",
      }),
    },
  },
  plugins: [],
};
