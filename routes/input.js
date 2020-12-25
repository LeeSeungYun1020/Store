const express = require('express');
const router = express.Router();

router.get('/manual', function(req, res, next) {
  res.render('manual.ejs')
})

router.get('/file', function(req, res, next) {
  res.render('file.ejs')
})

// 라이브러리 파일 요청
router.get('/*.ejs', (req, res) => {
  res.render(req.params[0] + '.ejs')
})

router.get('/javascripts/*.js', (req, res) => {
  res.redirect(`/javascripts/${req.params[0]}.js`)
})

module.exports = router;
