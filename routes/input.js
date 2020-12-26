const express = require('express');
const router = express.Router();
const mysql = require('../lib/mysql')

router.get('/manual', function (req, res, next) {
  res.render('manual.ejs')
})

router.post('/customer', function (req, res, next) {
  mysql.query(`INSERT INTO customer (name, phone, address, gender) VALUE (?, ?, ?, ?)`,
      [req.body.name, req.body.phone, req.body.address, req.body.gender],
      function (error, results) {
        if (error) {
          let msg = "데이터베이스 입력 차단"
          if (error.sqlMessage)
            msg += " - " + error.sqlMessage
          res.render('alert.ejs',
              {message: msg, redirect: "/input/manual"})
        } else res.render('alert.ejs',
            {message: "입력 완료", redirect: "/input/manual"})
      })
})

router.post('/trade', function (req, res, next) {
  mysql.query(`INSERT INTO trade (transactionNumber, productID, price, date, customerName) VALUE (?, ?, ?, ?, ?)`,
      [req.body.transactionNumber, req.body.productID, req.body.price, req.body.data, req.body.customerName],
      function (error, results) {
        if (error) {
          let msg = "데이터베이스 입력 차단"
          if (error.sqlMessage)
            msg += " - " + error.sqlMessage
          res.render('alert.ejs',
              {message: msg, redirect: "/input/manual"})
        } else res.render('alert.ejs',
            {message: "입력 완료", redirect: "/input/manual"})
      })
})

router.post('/product', function (req, res, next) {
  mysql.query(`INSERT INTO product (productID, name, supplierName) VALUE (?, ?, ?)`,
      [req.body.productID, req.body.name, req.body.supplierName],
      function (error, results) {
        if (error) {
          let msg = "데이터베이스 입력 차단"
          if (error.sqlMessage)
            msg += " - " + error.sqlMessage
          res.render('alert.ejs',
              {message: msg, redirect: "/input/manual"})
        } else res.render('alert.ejs',
            {message: "입력 완료", redirect: "/input/manual"})
      })
})

router.get('/file', function (req, res, next) {
  res.render('file.ejs')
})

router.post('/file', function (req, res, next) {
  console.log(req.files)
  console.log(req.file)
  res.send(req.files)
  return
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
})

// 라이브러리 파일 요청
router.get('/*.ejs', (req, res) => {
  res.render(req.params[0] + '.ejs')
})

router.get('/javascripts/*.js', (req, res) => {
  res.redirect(`/javascripts/${req.params[0]}.js`)
})

module.exports = router;
