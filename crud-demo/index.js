let express = require('express')
// let router = require('./router')
let router = require('./router-mongodb')
var bodyParser = require('body-parser')
let app = express()

// 配置靜態資源
app.use('/public', express.static('./static'))

// 配置模板引擎
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引入router
app.use(router)

app.listen(3000, function () {
  console.log('server is running,url : https://localhost:3000')
})
