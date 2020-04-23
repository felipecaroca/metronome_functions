const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

exports.addSong = functions.https.onCall((data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'debe estar logueado');
  }

  return admin.firestore().collection('users').doc(context.auth.uid)
    .collection('songs')
    .add(data).then((result) => {
      console.error(result)
      return result.id
    }).catch(err=>{
      throw new functions.https.HttpsError('failed-precondition', err.message)
    })

});

exports.updateSong = functions.https.onCall((data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'debe estar logueado');
  }

  return admin.firestore().collection('users').doc(context.auth.uid).collection('songs')
    .doc(data.id).set(data).then((result) => {
      console.error(result)
      return result
    }).catch(err=>{
      throw new functions.https.HttpsError('failed-precondition', err.message)
    })

});

exports.deleteSong = functions.https.onCall((data, context)=>{

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'debe estar logueado');
  }

  return admin.firestore().collection('users').doc(context.auth.uid).collection('songs')
    .doc(data.id).delete()

})
