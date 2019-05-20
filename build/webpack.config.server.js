const path = require('path')

module.exports = {
  target: 'node', // 打包出的的内容在那個執行環境中執行（Web瀏覽器/Node）
  entry: { // 入口配置
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: { // 输出配置
    filename: 'server-entry.js', // 输出文件名
    path: path.join(__dirname, '../dist'), // 输出目录
    publicPath: '/public', // 引用打包的JS文件在HTML文件中基路径，可以指定CDN全路径
    libraryTarget: 'commonjs2' // 打包出來的JS模塊方案（cmd/umd/amd）
  },
  plugins: [
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
