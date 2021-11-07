require('dotenv').config();
const admin = require('firebase-admin');
const client = require('./client');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: "https://festdt-default-rtdb.firebaseio.com"
});

const db = admin.database();
const ref = db.ref('objects');

// event handler
exports.startDBListeners = () => {
    ref.child('crypto').orderByChild('CreatedAt').limitToLast(1).on('child_added', function (snapshot) {
        const data = snapshot.val();
        let id = data.Id;
        let type = data.Type;
        console.log('[DB]: Get New Object [Id:' + id + ', Type:' + type + ']');
        // send osc message to local app
        client.sendMessage('/mikoshi/wasshoi', type);
    }, function (error) {
        console.log('[DB]: Failed to add New Object:' + error.code);
    });
}

exports.sendData = (child, id, type) => {
    let json = getJson(child, id, type);
    // send data
    const newRef = ref.child(child).push();
    newRef.set(json);
    console.log('[DB]: Added Object [Id:' + id + ', Type:' + type + ']');

    if (child == 'effects') {
        setTimeout(() => {
            // remove data
            newRef.remove();
            console.log('[DB]: Removed Effect Object');
        }, 10000);
    }
}

getJson = (child, id, type) => {
    const date = new Date().getTime();
    let json;
    if (child == 'crypto') {
        json = {
            'Id': id,
            'Type': type,
            'CreatedAt': date
        }
    } else {
        json = {
            'Id': id,
            'Type': type,
            'Position': { 'x': 0, 'y': 0, 'z': 1 },
            'Rotation': { 'w': 1, 'x': 0, 'y': 0, 'z': 0 },
            'CreatedAt': date
        }
    }
    return json;
}