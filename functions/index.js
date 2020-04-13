const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
const {Part} = require('./models/part')

admin.initializeApp()

exports.song = functions.https.onCall((data, context) => {
  console.error(data)
  console.error(context.auth.uid)
  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'debe estar logueado');
  }
  let parts = []
  data.parts.forEach(part=>{
    let tmp = new Part()
    parts.push(tmp.createPart(part))
  })

  console.error(parts)

  return admin.firestore().collection('users').doc(context.auth.uid).collection('songs')
    .doc(data.name).set({
      name: data.name,
      compass: {
        tempo: data.compass.tempo,
        velocity: data.compass.velocity
      },
      parts: parts
    }).then((result) => {
      console.error(result)
      return result
    }).catch(err=>{
      throw new functions.https.HttpsError('failed-precondition', err.message)
    })
});
