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