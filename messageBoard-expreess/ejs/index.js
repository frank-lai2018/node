let express = require('express')
let ejs = require('ejs')
let bodyParser = require('body-parser')

//數據
let comments = [
    {
      name:'frank',
      message:'哈哈哈',
      date:'2021-02-22'
    },
    {
      name:'frank1',
      message:'哈哈哈1',
      date:'2021-02-23'
    },
    {
      name:'frank4',
      message:'哈哈哈4',
      date:'2021-02-24'
    },
    {
      name:'frank5',
      message:'哈哈哈5',
      date:'2021-02-25'
    }
  ]

let app = express()

//開放靜態資源
app.use('/public/',express.static('./static'))



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

//更改讀取後綴名為.html檔案
app.set('view engine', 'html')
// app.engine('html', ejs.renderFile)
app.engine('.html', ejs.__express)
// console.dir(ejs);
// console.dir('renderFile',ejs.renderFile);
// console.dir('__express',ejs.__express);

app.get('/',function(request,response){
    response.render('index',{comments:comments})
})

app.get('/post',function(request,response){
    response.render('post')
})

app.get('/addComment',function(request,response){
    let comment = request.query
    comment.date = new Date()
    comments.unshift(comment)
    response.redirect('/')
})

app.post('/post',function(request,response){
    let comment = request.body
    comment.date = new Date()
    comments.unshift(comment)
    response.redirect('/')
})

app.listen(3000,function(){
    console.log('app is running and listen 3000 ....');
})