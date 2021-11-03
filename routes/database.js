require('dotenv').config();
const admin = require('firebase-admin');

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
    ref.child('crypto').on('child_added', function (snapshot) {
        const data = snapshot.val();
        let id = data.Id;
        let type = data.Type;
        let msg = 'Get New Object [Id:' + id + ', Type:' + type + ']'
        console.log(msg);
    }, function (error) {
        console.log('Failed to add New Object:' + error.code);
    });
}


exports.sendData = (child, id, type) => {
    const date = new Date().getTime();
    const json = {
        'Id': id,
        'Type': type,
        'CreatedAt': date
    }
    // send message
    ref.child(child).push(json);
}