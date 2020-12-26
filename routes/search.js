const express = require('express');
const router = express.Router();
const mysql = require('../lib/mysql')

router.get('/type', function (req, res, next) {
    res.render('type.ejs')
})

router.post('/type/:type/:attr', function (req, res, next) {
    let value
    if (req.body.option === "same")
        value = req.body.text
    else
        value = "%" + req.body.text + "%"
    mysql.query(`SELECT * from ${req.params.type} where ${req.params.attr} LIKE ?`,
        [value],
        function (error, results) {
            console.log(error)
            return res.send({error: error, body: results})
        })
})

router.get('/case', function (req, res, next) {
    res.render('case.ejs')
})

router.post('/case/1', function (req, res, next) {
    mysql.query(`
select product.name
from (select trade.productID, count(trade.transactionnumber) as count
      from customer,
           trade
      where name = customerName
        and customer.gender = 'Female'
      group by trade.productID) female,
     (select productID, 0 as count
      from product
      where productID not in (select trade.productID
                              from customer, trade
                              where name = customerName and customer.gender = 'Male')
      UNION
      select trade.productID, count(trade.transactionnumber) as count
      from customer,
           trade
      where name = customerName
        and customer.gender = 'Male'
      group by trade.productID) male, product
where (female.productID = male.productID and female.count > male.count and female.productID = product.productID)
`.trim(),
        [req.body.date],
        function (error, results) {
            console.log(error)
            return res.send({error: error, body: results})
        })
})

router.post('/case/2', function (req, res, next) {
    mysql.query(`
                select product.*
                from trade, product
                where product.productID = trade.productID and date(date) < date(?)
                group by product.productID
                order by sum(price) desc
                limit ${req.body.count}`.trim(),
        [req.body.date],
        function (error, results) {
            console.log(error)
            return res.send({error: error, body: results})
        })
})

router.post('/case/3', function (req, res, next) {
    mysql.query(`
                select customer.name
                from customer, trade, product
                where customer.name = trade.customerName and trade.productID = product.productID
                group by customerName
                having count(transactionNumber) >= ?`.trim(),
        [req.body.count],
        function (error, results) {
            console.log(error)
            return res.send({error: error, body: results})
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
