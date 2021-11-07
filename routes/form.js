const express = require('express');
const router = express.Router();
const database = require('./database');
const crypto = require('crypto');

router.post('/', function (req, res, next) {
    const { id, type, eid, etype } = req.body;
    if (id != null) {
        const msg = sendData('crypto', id, type);
        res.render('index', { msg: msg });
    }
    if (eid != null) {
        const msg = sendData('effects', eid, etype);
        res.render('index', { msg: msg });
    }
});

sendData = (child, id, type) => {
    const hash = crypto.createHash('sha256').update(id).digest('hex');
    database.sendData(child, hash, parseInt(type, 10));
    const msg = 'Added Object [Id:' + hash + ', Type:' + type + ']';
    return msg;
}

module.exports = router;