/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      backgroundImage : {
        'logo-patter' : 'url(https://static.cdninstagram.com/rsrc.php/v3/y4/r/ItTndlZM2n2.png)'
      },

      colors: {
        facebook :'#0095f6' 
      }

    },
  },
  plugins: [],
}
