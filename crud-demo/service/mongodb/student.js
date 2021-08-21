let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/frank', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let studentSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  hobbies: {
    type: String,
    require: true
  }
})


module.exports = mongoose.model('User', studentSchema)
