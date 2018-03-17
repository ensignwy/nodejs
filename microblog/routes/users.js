var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //这个直接往页面上发送了一个字符串，而没有用到模板引擎
  res.send('Done');
});
module.exports = router;
