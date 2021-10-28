var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  const data = { msg: 'Enter id and type to add the object' };
  res.render('index', data);
});

module.exports = router;
