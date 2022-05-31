module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        dropdown:'dropdown 2s 1',
      },
      keyframes:{
            dropdown:{
              '0%':{
                   transform:'translateY(-100%)'
              },
              '100%':{
                transform:'translateY(0%)',
              },
          }
      },
      colors:{
         'home':'#dadbd3',
         'whatsapp':'#DCF8C6',
      },
      backgroundImage:{
        'LogIn':"url('../public/images/LogIn.png')",
        'chat':"url('../public/images/chat.jpg')"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') // add this to your plugins
  ],
}