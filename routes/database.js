require('dotenv').config();
const admin = require('firebase-admin');
const counter = require('./counter');
// const client = require('./client');

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

// initialize
exports.initialize = () => {
    const rootRef = ref.child('crypto');
    rootRef.limitToLast(500).once('value', (snap) => {
        const val = snap.val();
        let cnt = 0;
        for (const key of Object.keys(val)) {
            cnt++;
            if (cnt < snap.numChildren()) counter.add(val[key].Type);
        }
        console.log('[DB]: Initial data loading is complete');
    }, (error) => {
        console.log('[DB]: Failed to load initial data:' + error.code);
    });

    rootRef.limitToLast(1).on('child_added', (snap) => {
        const val = snap.val();
        let id = val.Id;
        let type = val.Type;
        // increase object type counter
        counter.add(type);
        // send osc message to local app
        // client.sendMessage('/mikoshi/wasshoi', type);
        console.log('[DB]: Get new object [Id:' + id + ', Type:' + type + ']');
    }, (error) => {
        console.log('[DB]: Failed to get new object:' + error.code);
    });
}

exports.sendData = (child, id, type) => {
    let json = getJson(child, id, type);
    // send data
    const newRef = ref.child(child).push();
    newRef.set(json, (error) => {
        if (error) {
            console.log('[DB]: Data could not be saved:' + error);
        } else {
            console.log('[DB]: Send Data [Id:' + id + ', Type:' + type + ']');
        }
    });

    if (child == 'effects') {
        setTimeout(() => {
            // remove data
            newRef.remove();
            console.log('[DB]: Removed effect object');
        }, 10000);
    }
}

exports.removeData = (child, num) => {
    const rootRef = ref.child(child);
    rootRef.limitToFirst(num).once('value', (snap) => {
        const val = snap.val();
        for (const key of Object.keys(val)) {
            counter.sub(val[key].Type);
            rootRef.child(key).remove();
        }
        console.log('[DB]: Data deletion is complete');
    }, (error) => {
        console.log('[DB]: Failed to delete data:' + error.code);
    });
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