const express = require('express');
const router = express.Router();

router.get('/manual', function (req, res, next) {
  res.render('manual.ejs')
})

router.post('/customer', function (req, res, next) {
  res.redirect('manual.ejs')
})

router.post('/trade', function (req, res, next) {
  res.redirect('manual.ejs')
})

router.post('/product', function (req, res, next) {
  res.redirect('manual.ejs')
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
