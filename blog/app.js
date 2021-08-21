let express = require('express')
let path = require('path')
let router = require('./routes/router')
let bodyParser = require('body-parser')
let session = require('express-session')

let app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/public/', express.static(path.join(__dirname, './node_modules/')))

// 設定讀取.html檔案
app.engine('html', require('express-art-template'))

// 設定art-template讀取VIEW的地方，預設即是views底下
app.set('views', path.join(__dirname, './views/'))

// 配置body-parser，以獲取請求的body數據，一要寫在掛載路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 增加session 配置
app.use(session({
  secret: 'FRANK20210821', // 配置加密的字串，會在原有的加密基礎之上拼接上這個字串去加密
  resave: false, //
  saveUninitialized: true // 無論你是否使用SESSION，我都默認直接給你分配一把鑰匙，如果是false，代表後端真正加入的SESSION才會給你分配鑰匙
}))

// 掛載路由
app.use(router)

// 處理404
app.use(function (request, response) {
  response.render('_partials/404.html')
})

// 配置一個全局錯誤處理中間件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(5000, () => {
  console.log('server is running .....')
})
