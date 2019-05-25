const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'
const config = webpackMerge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  target: 'node', // 打包出的的内容在那個執行環境中執行（Web瀏覽器/Node）
  entry: { // 入口配置
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: { // 输出配置
    filename: 'server-entry.js', // 输出文件名
    publicPath: '/public', // 引用打包的JS文件在HTML文件中基路径，可以指定CDN全路径
    libraryTarget: 'commonjs2' // 打包出來的JS模塊方案（cmd/umd/amd）
  },
  plugins: [
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
})

module.exports = config
