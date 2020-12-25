const express = require('express');
const router = express.Router();
const mysql = require('../lib/mysql')

router.get('/type', function(req, res, next) {
  res.render('type.ejs')
})

router.post('/type/:type/:attr', function(req, res, next) {
  mysql.query(`SELECT * from ${req.params.type} where ${req.params.attr} LIKE ?`,
      ["%" + req.body.text + "%"],
      function (error, results) {
        console.log(error)
        return res.send({error: error, body: results})
      })
})

router.get('/case', function (req, res, next) {
  res.render('case.ejs')
})

router.post('/case/1', function (req, res, next) {
  res.send({error: error, body: results})
})

router.post('/case/2', function (req, res, next) {
  res.send({error: error, body: results})
})

router.post('/case/3', function (req, res, next) {
  res.send({error: error, body: results})
})

// 라이브러리 파일 요청
router.get('/*.ejs', (req, res) => {
  res.render(req.params[0] + '.ejs')
})

router.get('/javascripts/*.js', (req, res) => {
  res.redirect(`/javascripts/${req.params[0]}.js`)
})

module.exports = router;
