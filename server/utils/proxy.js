import axios from 'axios'
const querystring = require('querystring')
const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const { path } = req
  const user = req.session.user
  const needAccessToken = req.query.needAccessToken
  console.log('<<<<<<<<<<<<<[needAccessToken]', needAccessToken, '>>>>>>>>>>>>>\n')
  console.log('<<<<<<<<<<<<<[user]', user, '>>>>>>>>>>>>>\n')
  console.log('<<<<<<<<<<<<<[req.session]', req.session, '>>>>>>>>>>>>>\n')
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken

  console.log('<<<<<<<<<<<<<', `${baseUrl}${path}`, '>>>>>>>>>>>>>\n')
  console.log('<<<<<<<<<<<<<', `${req.method}`, '>>>>>>>>>>>>>\n')
  console.log('<<<<<<<<<<<<<', query, '>>>>>>>>>>>>>\n')
  console.log('<<<<<<<<<<<<<', user, '>>>>>>>>>>>>>\n')
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      console.log('----------------', err.response.data, '-----------')
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        sccess: false,
        msg: '未知错误'
      })
    }
  })
}
