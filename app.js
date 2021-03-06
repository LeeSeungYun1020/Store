const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const mysql = require('./lib/mysql.js')
const fs = require('fs')
const multer = require("multer")
const csvParser = require("csv-parse")
const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/tem/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})
const upload = multer({storage: storage})
const indexRouter = require('./routes/index');
const inputRouter = require('./routes/input')(upload);
const searchRouter = require('./routes/search');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexRouter);
app.use('/input', inputRouter);
app.use('/search', searchRouter);
app.get('/*.html', (req, res) => {
  res.render(req.params[0] + '.html')
})
app.get('/*.ejs', (req, res) => {
  res.render(req.params[0] + '.ejs')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
