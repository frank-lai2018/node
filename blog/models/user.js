let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/frank', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let Schema = mongoose.Schema

let userSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  nickName: {
    type: String,
    require: true
  },
  gender: {
    type: Number,
    // -1 :保密 0:女 1:男
    enum: [-1, 0, 1],
    require: true
  },
  userDesc: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: {
    type: Date,
    default: Date.now
  },
  birthday: {
    type: Date
  },
  picture: {
    type: String,
    default: ''
  },
  sataus: {
    type: Number,
    // 0 無限制
    // 1 
    enum: [0, 1, 2, 3]
  }
})

module.exports = mongoose.model('User', userSchema)
