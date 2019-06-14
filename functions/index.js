const functions = require('firebase-functions');
const uuid = require('uuid/v4')
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const  db = admin.firestore();
const id = uuid();

exports.addUser = functions.https.onRequest((req, res) => {
 const { name, address, age , type } = req.query;

 const docRef = db.collection('users').doc(id);
 docRef.set({name, address, age , type });
 
 res.send('usuario creado con id: '+ id);
});

exports.getUser = functions.https.onRequest( async (req, res) => {
  const user = await db.collection('users').doc(req.query.id).get();

  res.json({info: user.data(), id: user.id });
})