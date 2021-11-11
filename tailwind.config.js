colors = require('tailwindcss/colors')

const fontAwesomeWhitelistPatterns = [/^fa-/, /^svg-inline--fa/]

module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.vue'
    ],
    options: {
      whitelist: [],
      whitelistPatterns: [...fontAwesomeWhitelistPatterns], 
      whitelistPatternsChildren: [], 
    }
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {},
  plugins: []
}
