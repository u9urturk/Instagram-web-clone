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
      },
      maxWidth: {
        '4/10': '40%',
        '6/10': '60%',
        '3/10': '30%',
        '7/10':'70%'
      }

    },
  },
  plugins: [],
}
