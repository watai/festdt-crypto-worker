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
    // added CryptObject
    ref.child('crypto').on('child_added', function (snapshot) {
        console.log('Added Crypt Object!!');
        const data = snapshot.val();
        const id = data.Id;
        const type = data.Type;
        console.log(data);


    }, function (error) {
        console.log('Failed to add "Crypt Object": ' + error.code);
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