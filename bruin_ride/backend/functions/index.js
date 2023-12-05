/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({origin: true});
var serviceAccount = require('./bruinride-41c8c-af7386b4c05d.json');
const { auth } = require('firebase-admin');
const { getFirestore, getDocs, collection, query, updateDoc, onSnapshot, where, setDoc, doc } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bruinride-41c8c-default-rtdb.firebaseio.com"
});


const app = express();
app.use(cors);
let db = null;
const firebaseConfig = {
  apiKey: "AIzaSyDnYQ5G59of8KxraVKEPYQ0EXbAS4iP18s",
  authDomain: "bruinride-41c8c.firebaseapp.com",
  projectId: "bruinride-41c8c",
  storageBucket: "bruinride-41c8c.appspot.com",
  messagingSenderId: "667677751852",
  appId: "1:667677751852:web:16a4993a6541a5edeb6f89",
  measurementId: "G-FXNPFB06WZ",
  databaseURL: "https://bruinride-41c8c-default-rtdb.firebaseio.com/"
};
// Make sure Firebase is initilized
try {
  if (firebaseConfig && firebaseConfig.apiKey) {
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
  }
} catch (e) {
  console.error(e);
}

exports.updatePhoneNumber = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed

  try {
    const uid = request.query.uid;
    const phoneNumber = request.query.phoneNumber;

    if (!uid || !phoneNumber) {
      response.status(400).json({ error: 'Invalid request data' });
      return;
    }

    const q = query(
      collection(db, "phoneNumbers"),
      where("uid", "==", uid)
    );

    const phoneRef = collection(db, "phoneNumbers");

    let querySnapshot = null;

    try {
      querySnapshot = await getDocs(q);
    } catch (e) {
      console.log('Error getting documents: ', e);
      response.status(500).send(JSON.stringify({ message: 'Error getting documents: ' + e }));
      return;
    }

    if (querySnapshot === null) {
      console.log('Error getting documents');
      response.status(500).send(JSON.stringify({ message: 'Error getting documents' }));
      return;
    }
    let phone;
    let found = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) {
        found = true;
        phone = doc.data().phoneNumber;
      }
    });

    if (!found) {
      await setDoc(doc(phoneRef, uid), { uid: uid, phoneNumber: phoneNumber });
      response.status(200).json({ message: 'Phone number updated successfully' });
      return;
    }

    if (found){
      response.send(200).json(phone);
      return;

    }


  } catch (error) {
    console.error('Error updating phone number:', error);
    response.status(500).json({ error: 'Internal Server Error' });
    return;
  }

});


exports.algo = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed
  //const db = request.query.database;
  const dateTime = request.query.dateTime;
  const pickupLocation = request.query.location;
  const uid = request.query.uid;
  const name = request.query.name;

  // ...

  const q = query(
    collection(db, "trips"),
    where("dateTime", "==", dateTime),
    where("pickupLocation", "==", pickupLocation),
    where("groupSet", "==", false)
  );
  
  let querySnapshot = null;
  try {
    querySnapshot = await getDocs(q);
    console.log('Query snapshot completed');
  } catch (e) {
    console.log('Error getting documents: ', e);
    response.status(500).send(JSON.stringify({message:'Error getting documents: ' + e}));
    return;
  }

  if(querySnapshot === null){
    console.log('Error getting documents');
    response.status(500).send(JSON.stringify({message:'Error getting documents'}));
    return;
  }

  let found = false;
  let possibleTrips = [];
  // Filter out trips that already have the user in them
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    if (!doc.data().groupMembers.includes(uid)) {
      possibleTrips.push(doc);
    }
    else if(doc.data().groupMembers.includes(uid)){
      found = true;
      console.log('User already in trip at this time and location');
      response.send(JSON.stringify({message: 'User already in trip at this time and location'}));
      return;
    }
  });

  console.log(possibleTrips);
  if(found){
    console.log('User already in trip at this time and location');
    response.send(JSON.stringify({message: 'User already in trip at this time and location'}));
    return;
  }
  const tripsRef = collection(db, "trips");
  if (querySnapshot.empty || possibleTrips.length === 0) {
    console.log('Creating new trip');
    // Create a new Uber trip
    // Add the new trip to the database
    await setDoc(doc(tripsRef), {
      name: [name],
      dateTime: dateTime,
      pickupLocation: pickupLocation,
      groupSet: false,
      groupSize: 1,
      groupMembers: [uid],
    });
    response.send(JSON.stringify({message: 'Trip created successfully with id: ' + tripsRef.id}));
    return;
  }

  const tripDocRef = possibleTrips[0].ref; // Reference to the first document
  const tripData = possibleTrips[0].data(); // Data of the first document

  // Modify the document data as needed
  tripData.groupMembers.push(uid);
  tripData.name.push(name)
  const groupIsSet = tripData.groupMembers.length <= 4 && tripData.groupMembers.length >= 3;

  try {
    await updateDoc(tripDocRef, {
      groupMembers: tripData.groupMembers,
      groupSet: groupIsSet,
      groupSize: tripData.groupMembers.length, 
      name : tripData.name,
    });
    response.send(tripData);
    return;
  } catch (e) {
    response.status(500).send(('Error updating trip. \n' + e).toJSON());
    console.log('Error updating trip. \n', e);
  }
  

  return;
});

exports.returnConfig = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed
  response.send(firebaseConfig)
  return firebaseConfig;
});




exports.getUsers = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed
  const uid = request.query.uid;
  console.log(uid)
  const userRecord = await admin.auth().getUser(uid);
  response.send(userRecord.toJSON());
  return;
});

exports.login = functions.https.onRequest(async (request, response) => {

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed
  try {
    // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
    const { email, password } = request.body;

    // Simulate user sign-in using Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);


    // Create a custom token
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    if (userRecord.password !== password) {
      response.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    else{
      response.status(200).json({ token: customToken, message: 'Signed in successfully!' });
    }

  } catch (error) {
    console.error('Error during login:', error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
  return;
});


exports.signup = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed

  try {
    // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
    const { email, password } = request.body;

    console.log(email);

    // Create a new user with email and password using the Admin SDK
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Optionally, you can do additional tasks like sending a welcome email or creating user-specific data

    response.status(201).json({ uid: userRecord.uid, message: 'User signed up successfully!' });
  } catch (error) {
    console.error('Error during signup:', error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
  return;
});
