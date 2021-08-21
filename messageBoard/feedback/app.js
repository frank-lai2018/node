// app application 應用程序
// 把當前模塊所有的依賴項都聲明再文件模塊最上面
// 為了讓目錄結構保持統一清晰，所以我們約定，把所有的 HTML 文件都放到 views（視圖） 目錄中
// 我們為了方便的統一處理這些靜態資源，所以我們約定把所有的靜態資源都存放在 public 目錄中
// 哪些資源能被用戶訪問，哪些資源不能被用戶訪問，我現在可以通過代碼來進行非常靈活的控制
// / index.html
// /public 整個 public 目錄中的資源都允許被訪問

let http = require('http')
let fs = require('fs')
let url = require('url')
let ejs = require('ejs')
console.log(module);
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

http.createServer(function(request,response){
  // 使用 url.parse 方法將路徑解析為一個方便操作的對象，第二個參數為 true 表示直接將查詢字符串轉為一個對象（通過 query 屬性來訪問）
  let parseObj = url.parse(request.url,true)

  // 單獨獲取不包含查詢字符串的路徑部分（該路徑不包含 ? 之後的內容）
  let pathname =parseObj.pathname
  console.log(parseObj)
  
  if(pathname === '/'){
    fs.readFile('./views/index.html',function(error,data){
      if (error) {
        response.end(error)
      }  else{
        let htmlTmp = ejs.render(data.toString(),{comments:comments})
        response.end(htmlTmp)
      }
    })
  } else if (pathname === '/pinglun') {
    // 注意：這個時候無論 /pinglun?xxx 之後是什麼，我都不用擔心了，因為我的 pathname 是不包含 ? 之後的那個路徑
      // 一次請求對應一次響應，響應結束這次請求也就結束了
      // res.end(JSON.stringify(parseObj.query))

      // 我們已經使用 url 模塊的 parse 方法把請求路徑中的查詢字符串給解析成一個對象了
      // 所以接下來要做的就是：
      //    1. 獲取表單提交的數據 parseObj.query
      //    2. 將當前時間日期添加到數據對像中，然後存儲到數組中
      //    3. 讓用戶重定向跳轉到首頁 /
      //       當用戶重新請求 / 的時候，我數組中的數據已經發生變化了，所以用戶看到的頁面也就變了
    let parseSearchParams = parseObj.query
    let comment = parseSearchParams
    comment.date = new Date()

    comments.unshift(comment)
    // 服務端這個時候已經把數據存儲好了，接下來就是讓用戶重新請求 / 首頁，就可以看到最新的留言內容了

      // 如何通過服務器讓客戶端重定向？
      //    1. 狀態碼設置為 302 臨時重定向
      //        statusCode
      //    2. 在響應頭中通過 Location 告訴客戶端往哪兒重定向
      //        setHeader
      // 如果客戶端發現收到服務器的響應的狀態碼是 302 就會自動去響應頭中找 Location ，然後對該地址發起新的請求
      // 所以你就能看到客戶端自動跳轉了
    response.statusCode = 302
    response.setHeader('Location','/')
    response.end()
    
  } else if (pathname === '/post') {
    fs.readFile('./views/post.html',function(error,data){
      if (error) {
          response.end(error)
      }  else{

        response.end(data)
      }
    })
  } else if (pathname.indexOf('/public/') !== -1) {
    console.log(pathname);
    fs.readFile(`.${pathname}`,function(error,data){
      response.end(data)
    })
  } else {
    fs.readFile(`./views/404.html`,function(error,data){
      if(error){
        response.end(error)
      }else{
        response.end(data)
      }
    })
  }
})
.listen(3000,function(){
  console.log('server run......');
})
