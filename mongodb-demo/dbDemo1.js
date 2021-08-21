let mongoose = require('mongoose')

let Schema = mongoose.Schema

// 1. 連接數據庫
// 指定連接的數據庫不需要存在，當你插入第一條數據之後就會自動被創建出來
mongoose.connect('mongodb://localhost/testDemo')

// 2. 設計文檔結構（表結構）
// 字段名稱就是表結構中的屬性名稱
// 約束的目的是為了保證數據的完整性，不要有臟數據
let userSchema = new Schema({
  username: {
    type: String,
    required: true // 必須有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

// 3. 將文檔結構發佈為模型
//    mongoose.model 方法就是用來將一個架構發佈為 model
//    第一個參數：傳入一個大寫名詞單數字符串用來表示你的數據庫名稱
//                 mongoose 會自動將大寫名詞的字符串生成 小寫複數 的集合名稱
//                 例如這裡的 User 最終會變為 users 集合名稱
//    第二個參數：架構 Schema
//   
//    返回值：模型構造函數
var User = mongoose.model('User', userSchema)


// 4. 當我們有了模型構造函數之後，就可以使用這個構造函數對 users 集合中的數據為所欲為了（增刪改查）
// **********************
// #region /新增數據
// **********************
// let admin = new User({
//   username: 'frank',
//   password: '123456',
//   email: 'frank@admin.com'
// })

// admin.save(function (err, ret) {
//   if (err) {
//     console.log('保存失敗')
//   } else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })
// **********************
// #endregion /新增數據
// **********************




// **********************
// #region /查詢數據
// **********************
// User.find(function (err, ret) {
//   if (err) {
//     console.log('查詢失敗')
//   } else {
//     console.log(ret)
//   }
// })

// User.find({
//   username: 'frank'
// }, function (err, ret) {
//   if (err) {
//     console.log('查詢失敗')
//   } else {
//     console.log(ret)
//   }
// })

// User.findOne({
//   username: 'frank'
// }, function (err, ret) {
//   if (err) {
//     console.log('查詢失敗')
//   } else {
//     console.log(ret)
//   }
// })
// **********************
// #endregion /查詢數據
// **********************



// **********************
// #region /刪除數據
// **********************
// User.remove({
//   username: 'zs'
// }, function (err, ret) {
//   if (err) {
//     console.log('刪除失敗')
//   } else {
//     console.log('刪除成功')
//     console.log(ret)
//   }
// })
// **********************
// #endregion /刪除數據
// **********************


// **********************
// #region /更新數據
// **********************
// User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
//   password: '123'
// }, function (err, ret) {
//   if (err) {
//     console.log('更新失敗')
//   } else {
//     console.log('更新成功')
//   }
// })
// **********************
// #endregion /更新數據
// **********************