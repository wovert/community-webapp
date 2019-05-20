const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

config = {
  mode: isDev ? 'development' : 'production',
  entry: { // 入口配置
    app: path.join(__dirname, '../client/app.js')
  },
  devtool:'#eval-source-map',//设置source map选项
  output: { // 输出配置
    filename: '[name].[hash].js', // 输出文件名name=entry.path
    path: path.join(__dirname, '../dist'), // 输出目录
    publicPath: '/public' // 引用打包的JS文件在HTML文件中基路径，可以指定CDN全路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/index.html')
    })
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
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

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: 4000,
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true // 编译出错时网页上遮罩层显示错误信息
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
}
module.exports = config