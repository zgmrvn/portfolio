// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'zgmrvn',
  siteUrl: 'https://www.zgmrvn.com',
  templates: {
    Project: '/projects/:slug',
  },
  permalinks: {
    trailingSlash: false
  },
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
 
    svgRule.uses.clear()
 
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
