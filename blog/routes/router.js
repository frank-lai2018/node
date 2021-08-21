let express = require('express')
let router = express.Router()
let md5 = require('blueimp-md5')
let User = require('../models/user')
const user = require('../models/user')

let KEY_MD5 = 'FRANK20210821'

// define the home page route
router.get('/', function (req, res) {
  let user = req.session.user
  console.log('cookie:', user)

  res.render('index.html', {user: user})
})

// define the about route
router.get('/login', function (req, res) {
  res.render('login.html')
})

// define the about route
router.get('/logout', function (req, res) {
  req.session.user = null
  res.redirect('/login')
})

router.post('/login', function (req, res) {
  let email = req.body.email
  let password = md5(md5(req.body.password), KEY_MD5)
  User.findOne({
    email: email,
    password: password
  }, function (error, data) {
    if (error) {
      res.status(500).json({
        errorCode: 'FL-500',
        errorMessage: '500 system error'
      })
    }else {
      if (data) {
        console.log('data',data);
        req.session.user = data
        res.status(200).json({
          errorCode: 'FL-200',
          errorMessage: '',
          message: 'login Success'
        })
      }else {
        console.log('login fail',data);
        res.status(200).json({
          errorCode: 'FL-205',
          errorMessage: 'login fail',
          message: ''
        })
      }
    }
  })
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', function (req, res) {
  console.log(req.body)
  User.findOne({
    email: req.body.email
  }, function (error, data) {
    if (error) {
      console.log('error', error)
      res.json({
        errorCode: 'FL-500',
        errorMessage: '500 system error'
      })
    }else {
      console.log('data', data)
      if (data) {
        res.json({
          errorCode: 'FL-201',
          errorMessage: 'email already registered',
          message: ''
        })
      }else {
        // 檢查nickName
        User.findOne({
          nickName: req.body.nickName
        }, function (error, data) {
          if (error) {
            res.json({
              errorCode: 'FL-500',
              errorMessage: '500 system error'
            })
          }else {
            if (data) {
              res.json({
                errorCode: 'FL-203',
                errorMessage: 'nickName already registered',
                message: ''
              })
            }else {
              req.body.password = md5(md5(req.body.password), KEY_MD5)
              new User(req.body).save(function (error, data) {
                if (error) {
                  res.json({
                    errorCode: 'FL-202',
                    errorMessage: 'register fail',
                    message: ''
                  })
                }else {
                  req.session.user = data
                  res.json({
                    errorCode: 'FL-200',
                    errorMessage: '',
                    message: 'register success'
                  })
                }
              })
            }
          }
        })
      }
    }
  })
})

router.get('/settings/profile', function (req, res) {
  res.render('./settings/profile.html')
})

router.get('/settings/admin', function (req, res) {
  res.render('./settings/admin.html')
})

module.exports = router
