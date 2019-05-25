import axios from 'axios'

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const { path } = req
  const { user = {} } = req.session
  const needAccessToken = req.query.needAccessToken
  if (needAccessToken && user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  const query = Object.assign({}, req.query)
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      accessToken: user.accessToken
    }),
    headers: {
      'Cotent-type': 'application/x-www-form-urlencode'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        sccess: false,
        msg: '未知错误'
      })
    }
  })
}
