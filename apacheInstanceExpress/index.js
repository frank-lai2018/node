// 0. 安裝
// 1. 引包
var express = require('express')

// 2. 創建你服務器應用程序
//    也就是原來的 http.createServer
var app = express()


// 在 Express 中開放資源就是一個 API 的事兒
// 公開指定目錄
// 只要這樣做了，你就可以直接通過 /public/xx 的方式訪問 public 目錄中的所有資源了
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))
app.use('/node_modules/', express.static('./node_modules/'))

// 模板引擎，在 Express 也是一個 API 的事兒

// 得到路徑
// 一個一個的判斷
// 以前的代碼很醜

app.get('/about', function (req, res) {
  // 在 Express 中可以直接 req.query 來獲取查詢字符串參數
  console.log(req.query)
  res.send('你好，我是 Express!')
})

app.get('/pinglun', function (req, res) {
  // req.query
  // 在 Express 中使用模板引擎有更好的方式：res.render('文件名， {模闆對象})
  // 可以自己嘗試去看 art-template 官方文檔：如何讓 art-template 結合 Express 來使用
})

// 當服務器收到 get 請求 / 的時候，執行回調處理函數
app.get('/', function (req, res) {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
<body>
  <h1>hello Express！你好</h1>
</body>
</html>
`)
})

// 相當於 server.listen
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})