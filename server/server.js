import fs from 'fs'
import path from 'path'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import session from 'express-session'
// eslint-disable-next-line no-unused-vars
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

const isDev = process.env.NODE_ENV === 'development'
const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react node class'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./utils/handle-login'))
app.use('/api', require('./utils/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default // require會讀取所有export
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 靜態資源
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  // 請求任何請求
  app.get('*', (req, res) => {
    const context = {}
    const appString = renderToString(
      <StaticRouter location={req.url} context={context}>
        {serverEntry}
      </StaticRouter>
    )
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
