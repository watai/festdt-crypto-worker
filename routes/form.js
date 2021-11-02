const express = require('express');
const router = express.Router();
const database = require('./database');
const crypto = require('crypto');

/* POST home page. */
router.post('/', function (req, res, next) {
    const { id, type } = req.body;
    const hash = crypto.createHash('md5').update(id).digest('hex');
    database.sendData('crypto', hash, type);
    const data = { msg: 'Added Crypt Object [Id:' + hash + ', Type:' + type + ']' };
    res.render('index', data);
});

module.exports = router;