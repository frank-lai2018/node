let fs = require('fs')

const filePath = './db.json'

exports.findAll = function (callBack) {
  readFile((error , data) => {
    returnResult(error , data , callBack)
  })
}

/**
 * 依照ID查找
 * @param {id} id 
 * @param {*} callBack 
 */
exports.findById = function (id, callBack) {
  readFile((error , data) => {
    if (error) {
      callBack(error)
    } else {
      let students = JSON.parse(data).students
      let student = students.find(item => item.id === parseInt(id))
      callBack(error, student)
    }
  })
}

exports.update = function (student, callBack) {
  readFile((error , data) => {
    if (error) {
      callBack(error)
    } else {
      student.id = parseInt(student.id)
      let students = JSON.parse(data).students
      let studentObj = students.find(item => item.id === student.id)
      console.log('student', student)
      console.log('studentObj', studentObj)
      for (let key in student) {
        studentObj[key] = student[key]
      }

      // 寫回文件
      writeFile(students, callBack)
    }
  })
}

exports.add = function (student, callBack) {
  readFile((error , data) => {
    if (error) {
      callBack(error)
    } else {
      let students = JSON.parse(data).students
      student.id = students[students.length - 1].id + 1
      console.log(student)
      students.push(student)

      // 寫回文件
      writeFile(students, callBack)
    }
  })
}

exports.deleteById = function (data , callBack) {
  let id = data.id
  readFile((error , data) => {
    if (error) {
      callBack(error)
    } else {
      let students = JSON.parse(data).students

      let deleteIndex = students.findIndex(item => item.id === parseInt(id))

      students.splice(deleteIndex, 1)

      // 寫回文件
      writeFile(students, callBack)
    }
  })
}

/**
 * 讀取file數據
 * @param {*} callback 
 */
function readFile (callback) {
  fs.readFile(filePath, 'utf8', function (error, data) {
    if (error) {
      callback(error)
    } else {
      callback(error, data)
    }
  })
}

function writeFile (students, callback) {
  fs.writeFile(filePath, JSON.stringify({students: students}), 'utf8', function (error) {
    if (error) {
      callback(error)
    } else {
      // 成功沒錯 error 就是NULL
      callback(null)
    }
  })
}

/**
 * 準備回傳結果
 * @param {*} error 
 * @param {*} data 
 * @param {*} callBack 
 */
function returnResult (error , data , callBack) {
  if (error) {
    callBack(error)
  } else {
    callBack(error , data)
  }
}
