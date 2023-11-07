/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#22C55E",
          "secondary": "#4B9B62",   
          "accent": "#d18917",      
          "neutral": "#292633",   
          "base-100": "#34313F",   
          "info": "#98c0e2",       
          "success": "#17c45c",     
          "warning": "#eab308",      
          "error": "#f2183c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
