import axios from 'axios'
const router = require('express').Router()
const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  // console.log('red:', req)
  // console.log('res:', res)
  // console.log('<<<<<<<<<<<<<req.body', req.body, '>>>>>>>>>>>>>\n')
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  })
    .then(resp => {
      console.log('=============', resp.status === 200 && resp.data.success, '===================')
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
