const database = require('./database');
const crypto = require('crypto');
const cron = require('node-cron');

exports.start = () => {
    // every 5 minute
    cron.schedule('*/5 * * * *', () => {
        let id = String(new Date().getTime());
        let type = getRandom(0, 4);
        const msg = task('crypto', id, type);
        // console.log(msg);
    });
}

task = (child, id, type) => {
    const hash = crypto.createHash('sha256').update(id).digest('hex');
    database.sendData(child, hash, parseInt(type, 10));
    const msg = '[SCH]: Added Object [Id:' + hash + ', Type:' + type + ']';
    return msg;
}

getRandom = (min, max) => {
    var random = Math.floor(Math.random() * (max + 1 - min)) + min;
    return random;
}
