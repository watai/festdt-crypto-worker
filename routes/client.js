const osc = require('node-osc');
const client = new osc.Client('127.0.0.1', 8000);

exports.sendMessage = (addr, msg) => {
    client.send(addr, msg, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('[OSC]: Send Message:' + addr + ' ' + String(msg));
        }
    });
}
