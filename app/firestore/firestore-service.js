const { firestoreDb, admin } = require('./firestore-config');


async function saveRecord (objectId, document) {
  const now = admin.firestore.Timestamp.fromDate(new Date());
  // await firestoreDb.collection('Game').add(document)
  const chatDocSnapshot = await firestoreDb.collection('Game').doc(objectId).get();
  document.updateTime = now;
  if (!chatDocSnapshot.exists) {
    document.createTime = now;
    document.updateTime = now;
    await firestoreDb.collection('Game').doc(objectId).set(document)
  } else {
    await firestoreDb.collection('Game').doc(objectId).set(document, { merge: true })
  }
}

module.exports = {
  saveRecord
};
