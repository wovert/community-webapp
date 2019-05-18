const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { // 入口配置
    app: path.join(__dirname, '../client/app.js')
  },
  output: { // 输出配置
    filename: '[name].[hash].js', // 输出文件名name=entry.path
    path: path.join(__dirname, '../dist'), // 输出目录
    // publicPath: '/public' // 引用打包的JS文件在HTML文件中基路径，可以指定CDN全路径
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-react-jsx']
        },
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
