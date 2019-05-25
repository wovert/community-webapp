// eslint-disable-next-line no-unused-vars
const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const asyncBootstrap = require('react-async-bootstrapper').default

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:4000/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor
const mfs = new MemoryFs()

// 编译打包服务端
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle, createStoreMap

// 监听编译打包服务端
// stats webpack 打包的信息
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()

  // console.log('---------------------------')
  // console.log(stats)
  // console.log('---------------------------')

  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  // 内存读写文件
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:4000',
    changeOrigin: true
  }))

  app.get('*', (req, res) => {
    getTemplate().then(template => {
      // console.log(serverBundle)

      const routerContext = {}
      const app = serverBundle(createStoreMap(), routerContext, req.url)
      const content = ReactDomServer.renderToString(app)
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
