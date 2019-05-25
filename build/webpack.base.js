const path = require('path')

module.exports = {
  output: { // 输出配置
    path: path.join(__dirname, '../dist') // 输出目录
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 编译之前
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
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
