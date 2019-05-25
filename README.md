# 社区

## 项目介绍

### 单页应用问题

- SEO不友好
- 加载首屏时间较长，用户体验差

### 服务端渲染

- 前后端同构
  - 数据同步
  - 路由跳转
  - SEO 信息

### 工程架构

- webpack 配置
- node 服务
- 恩服务端渲染

### 项目架构

- React
- React-Router 配置
- Mobx 配置
- 服务端渲染优化

### 业务开发

- 页面开发
- 登录服务
- 服务端渲染优化

### 项目部署

- pm2
- nginx
- 一键部署

## 前段技术选型

> 根据不同的项目需求，选择不同的技术栈

- 传统的多页面不会选择React作为前段框架
- 单页面选择jQuery来做会变得非常困难

### 如何区分

- 单页应用
- 多页应用

### 传统多页应用

- 特征
  - 内容都是由服务端用模板生成
  - 每次页面跳转都要经过服务端
  - JS 更多只是做做动画
- 常用类库
  - **jQuery**(封装DOM操作，兼容N个浏览器)
  - **mootools**(封装DOM操作，扩展prototype)
  - **YUI**(封装DOM操作鼻祖)

#### 架构工具

- 无特定前段工具，跟后端配置
- grunt
- gulp

#### 模块化工具

- 无
- seajs(支付宝,AMD)
- requirejs(CMD)

#### 静态文件

- 使用 gulp 和 grunt 等工具手动编译到HTML中，自由度低，操作复杂。货真甚至不处理，交给后端，让后端服务处理

### 单页应用

- 特征：
  - 所有内容都在前段生成
  - JS 承担更多的业务逻辑，后端只提供API
  - 页面路由跳转不需要经过后端

#### 单页面常用类库

- backbone(MVC)
- React(jsx)
- Vue(vue template)
- Angular(typescript)

#### 单页面架构工具

- npm
- bower
- jspm(面向未来)
  - 前段类库独立出来
  - 不打包库，前段异步加载类库

#### 单页面模块化工具

- webpack(开发时使用)
- rollup(上线时使用)
- browserify

#### 单页面静态文件

可以直接在JS代码中进行引用，并且交由模块化工具转化成线上可用的静态资源，并且可以定制转化过程使用不同的需求场景

#### 单页面其他考虑因素

- 浏览器兼容性
  - toB: 商用软件,浏览器兼容性比较低或交互比较低)
  - toC：业务不复杂，交互高，性能要求高
- 移动端(分辨率、网速)还是PC端

## WebApp 架构

- 工程架构
  - 解放生产力
    - 源代码预处理
    - 自动打包，自动更新新页面显示，热更新
    - **自动处理图片依赖，保证开发和正式环境的统一
  - 搭建环境
    - **不同的前段**框架需要不同的运行**架构**
    - **预期**可能出现的**问题**并**规避**
  - 保证项目质量
    - code lint(代码规范)
    - 不同环境排除差异(WinOS,MacOS回车符差异化)
    - git commit 预处理
- 项目架构
  - 技术选型
  - 数据解决方案
  - 整体代码风格

### Web开发网络优化

- 优化方法
  - **合并资源文件**，减少 `HTTP` 请求
  - **压缩资源文件**减少请求大小
  - 利用**缓存机制**，尽可能使用缓存，减少请求（哈希机制）

## webpack 基础配置

```sh
# npm init
# yarn add react react-dom
# yarn add webpack webpack-cli babel-loader babel-core babel-preset-env -D

```

## 服务端渲染基础配置

- SEO 問題
- 白屏：首次請求等待時間較長，體驗不好

### React 中如何使用服務端渲染

`react-dom` 是 React 專門為 Web 段開發的渲染工具。我們可以在客戶端使用 `react-dom` 的 `render` 方法渲染組件，而在服務端，`react-dom/server` 提供我們將 react 組件渲染成 HTML 的方法

```sh
# yarn add -D rimraf
# vim client/server-entry.js
  import React from 'react'
  import App from './App.jsx'
  export default <App />

# vim package.json
  "dev-client:build": "webpack --mode=development --config build/webpack.config.client.js",
  "dev-server:build": "webpack --mode=development --config build/webpack.config.server.js",
  "clear": "rimraf dist",
  "dev:build": "yarn clear && yarn dev-client:build && yarn dev-server:build"

# yarn dev:build
# yarn add express
# mkdir server
# vim server/server.js
  const express = require('express')
  const ReactSSR = require('react-dom/server')
  const fs = require('fs')
  const path = require('path')
  const serverEntry = require('../dist/server-entry').default // require會讀取所有export

  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  const app = express()
  const port = 4001

  // 靜態資源
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  // 請求任何請求
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })

  app.listen(port, (err) => {
    console.log(`server is listening on ${port}`)
  })
# vim client/app.js
  ReactDOM.hydrate(<App />, document.getElementById('root'))
# vim package.json
  "dev:start": "node server/server.js"
# yarn dev:start
```

## webpack-dev-server 配置

> webpack 启动服务器，编译的结果存储于内存中，有文件变化自动编译。

```sh
# yarn add -D webpack-dev-server cross-env
# vim build/webpack.config.client.js
  const isDev = process.env.NODE_ENV === 'development'
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
# vim package.json
  "dev-client:start": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js",

# yarn add -D react-hot-loader
# vim build/webpack.config.client.js
  if (isDev) {
    config.devServer = {
      hot: true,
    }
  }
  module.exports = config

# vim .babelrc
  {
    "plugins": ["react-hot-loader/babel"]
  }

# vim client/App.jsx
  import React, { Component } from 'react'
  import { hot } from 'react-hot-loader/root'

  class App extends Component {
    render () {
      return (
        <div>
          This is WebApp
        </div>
      )
    }
  }
  export default hot(App)

# yarn dev-client:start
```

## 开发时的服务端渲染

```sh
# yarn add axios
# yarn add -D memory-fs http-proxy-middleware
# yarn add react-dom@npm:@hot-loader/react-dom

# vim server/utils/dev-static.js
  const axios = require('axios')
  const path = require('path')
  const webpack = require('webpack')
  const MemoryFs = require('memory-fs')
  const proxy = require('http-proxy-middleware')
  const ReactDomServer = require('react-dom/server')
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
  const mfs = new MemoryFs

  // 编译打包服务端
  const serverCompiler = webpack(serverConfig)
  serverCompiler.outputFileSystem = mfs
  let serverBundle

  // 监听编译打包服务端
  // stats webpack 打包的信息
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
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
  })

  module.exports = function (app) {
    app.use('/public', proxy({
      target: 'http://localhost:4000',
      changeOrigin: true
    }))

    app.get('*', (req, res) => {
      getTemplate().then(template => {
        // console.log(serverBundle)
        const content = ReactDomServer.renderToString(serverBundle)
        res.send(template.replace('<!-- app -->', content))
      })
    })
  }

# yarn dev:client
# yarn dev:server
```

## eslint 和 editorconfig 规范代码

[eslint官网](http://eslint.org)

### why eslint

- 规范代码有利于团队协作
- 纯手工费时费力，不能保证准确性
- 自动提醒功能，提高开发效率

```sh
# npm i -g eslint
# npm i babel-eslint \
eslint-config-airbnb eslint-config-standard \
eslint-loader \
eslint-plugin-import \
eslint-plugin-jsx-a11y \
eslint-plugin-node \
eslint-plugin-promise \
eslint-plugin-react \
eslint-plugin-standard -D

# eslint --init
# vim .eslintrc
 {
   "extends": "standard"
 }
# vim client/.eslintrc
{
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "airbnb",
  "rules": {
    "semi": [0],
    "linebreak-style": [0 ,"error", "windows"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
}

# vim webpack.config.js
  rules: [
    {
      enforce: 'pre', // 编译之前
      test: /.(js|jsx)$/,
      loader: 'eslint-loader',
      exclude: [
        path.resolve(__dirname, '../node_modules')
      ]
    },
  ]

# .editorconfig
root = true
[*]
chraset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## 工程架构优化

```sh
# yarn add -D webpack-merge

# yarn add serve-favicon
```

## nodemon

``` sh
# yarn add nodemon
# vim nodemon.json
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules",
    ".eslintrc",
    "client",
    "build"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "verbose": true,
  "ext": "js"
}

# vim package.json
  nodemon --exec babel-node server/server.js
```
