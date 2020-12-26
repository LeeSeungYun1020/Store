const express = require('express');
const router = express.Router();
const mysql = require('../lib/mysql')
const readline = require("readline");
const fs = require('fs')
const parse = require("csv-parse/lib/sync")

module.exports = function (upload) {
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
            [req.body.transactionNumber, req.body.productID, req.body.price, req.body.date, req.body.customerName],
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

    router.post('/file', upload.single("file"), function (req, res, next) {
        //processLineByLine(req.file.path);
        fs.readFile(req.file.path, function (err, data) {
            if (err) {
                res.render('alert.ejs',
                    {message: "파일 입력 오류 - CSV형식이 맞는지 확인해주십시오.", redirect: "/input/file"})
            }
            const records = parse("1, 2, 3, 4, 5, 6\r\n" + data, {
                skip_empty_lines: true,
                trim: true,
                relax_column_count_less: true
            })
            let errorCount = 0
            let errorMessage = ""
            for (const column of records) {
                const type = column[0]
                if (type === "C") {
                    mysql.query(`INSERT INTO customer (name, phone, address, gender) VALUE (?, ?, ?, ?)`,
                        [column[1], column[2], column[3], column[4]],
                        function (error, results) {
                            if (error) {
                                errorCount++
                                if (error.sqlMessage)
                                    errorMessage += error.sqlMessage + "\n"
                            }
                        })
                } else if (type === "T") {
                    let date = column[4]
                    if (column[4].charAt(4) !== "-") {
                        const words = date.split('/')
                        date = `${words[2]}-${words[1]}-${words[0]}`
                    }

                    let price = column[3].replace('$', '')

                    mysql.query(`INSERT INTO trade (transactionNumber, productID, price, date, customerName) VALUE (?, ?, ?, ?, ?)`,
                        [column[1], column[2], price, date, column[5]],
                        function (error, results) {
                            if (error) {
                                errorCount++
                                if (error.sqlMessage)
                                    errorMessage += error.sqlMessage + "\n"
                            }
                        })
                } else if (type === "P") {
                    mysql.query(`INSERT INTO product (name, productID, supplierName) VALUE (?, ?, ?)`,
                        [column[1], column[2], column[3]],
                        function (error, results) {
                            if (error) {
                                errorCount++
                                if (error.sqlMessage)
                                    errorMessage += error.sqlMessage + "\n"
                            }
                        })
                }
            }
            if (errorCount !== 0) {
                res.render('alert.ejs',
                    {
                        message: `데이터 입력 차단 (${errorCount}개/${records.length}개)\n` + errorMessage,
                        redirect: "/input/file"
                    })
            } else
                res.render('alert.ejs',
                    {
                        message: "파일 데이터 입력 완료",
                        redirect: "/input/file"
                    })
        })
    })

// 라이브러리 파일 요청
    router.get('/*.ejs', (req, res) => {
        res.render(req.params[0] + '.ejs')
    })

    router.get('/javascripts/*.js', (req, res) => {
        res.redirect(`/javascripts/${req.params[0]}.js`)
    })

    return router;
}

