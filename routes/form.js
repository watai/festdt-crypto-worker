const express = require('express');
const router = express.Router();
const database = require('./database');
const crypto = require('crypto');

router.post('/', function (req, res, next) {
    const { id, type, eid, etype } = req.body;
    if (id != null) {
        const hash = crypto.createHash('sha256').update(id).digest('hex');
        database.sendData('crypto', hash, parseInt(type, 10));
        const data = { msg: 'Added Crypt Object [Id:' + hash + ', Type:' + type + ']' };
        res.render('index', data);
    }
    if (eid != null) {
        const hash = crypto.createHash('sha256').update(eid).digest('hex');
        database.sendData('effects', hash, parseInt(etype, 10));
        const data = { msg: 'Added Effect Object [Id:' + hash + ', Type:' + etype + ']' };
        res.render('index', data);
    }
});

module.exports = router;