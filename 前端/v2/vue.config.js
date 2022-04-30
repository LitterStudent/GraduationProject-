const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
  // publicPath: './'
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
