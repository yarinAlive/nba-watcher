const admin = require('firebase-admin');
const serviceAccount = require('./firestore-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestoreDb = admin.firestore();
module.exports = {
  firestoreDb,
  admin
};
