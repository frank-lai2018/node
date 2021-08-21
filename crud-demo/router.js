const { strictEqual } = require('assert')
const express = require('express')
const fs = require('fs')
const Student = require('./service/fs/student')

let router = express.Router()

router.get('/students', function (request, response) {
  Student.findAll((error, data) => {
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.render('index.html', JSON.parse(data))
    }
  })
})

router.get('/student/new', function (request, response) {
  response.render('new.html')
})

router.post('/student/add', function (request, response) {
  Student.add(request.body, (error, data) => {
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.redirect('/students')
    }
  })
})

router.post('/student/update', function (request, response) {
  Student.update(request.body, (error, data) => {
    if (error) {
      response.status(500).send('server error 500')
    } else {
      response.redirect('/students')
    }
  })
})

router.get('/student/delete', function (request, response) {
  Student.deleteById(request.query, (error, data) => {
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
