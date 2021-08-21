const { strictEqual } = require('assert')
const express = require('express')
const fs = require('fs')
const Student = require('./service/mongodb/student')

let router = express.Router()

router.get('/students', function (request, response) {
  Student.find((error, data) => {
    console.log(data)
    console.log(error)
    if (error) {
      response.status(500).send('server error 500')
    } else {
      if (data.length) {
        response.render('index.html', {students: data})
      }else{

        response.render('index.html', null)
      }
    }
  })
})

router.get('/student/new', function (request, response) {
  response.render('new.html')
})

router.post('/student/add', function (request, response) {
  new Student(request.body).save((error, data) => {
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.redirect('/students')
    }
  })
})

router.post('/student/update', function (request, response) {
  Student.findByIdAndUpdate(request.body.id, request.body, (error, data) => {
    console.log('id',request.body.id);
    console.log('request.body',request.body);
    console.log('data',data);
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.redirect('/students')
    }
  })
})

router.get('/student/delete', function (request, response) {
  let id = request.query.id
  console.log('id', id)
  Student.deleteOne({ _id: id }, (error, data) => {
    console.log('error', error)
    console.log('data', data)
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.redirect('/students')
    }
  })
})

router.get('/student/updatePage', function (request, response) {
  let id = request.query.id
  Student.findById(id, (error, data) => {
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.render('edit.html', {student: data})
    }
  })
})

module.exports = router
