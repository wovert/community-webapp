import express from 'express'
import React from 'react'
import favicon from 'serve-favicon'
import { renderToString } from 'react-dom/server'
import fs from 'fs'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'
const app = express()
const port = 4001

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default // require會讀取所有export
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 靜態資源
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  // 請求任何請求
  app.get('*', (req, res) => {
    const appString = renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.listen(port, (err) => {
  console.log(`server is listening on ${port}`)
})
