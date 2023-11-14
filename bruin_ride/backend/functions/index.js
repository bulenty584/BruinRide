/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
<<<<<<< HEAD
 const {onRequest} = require("firebase-functions/v2/https");
 const logger = require("firebase-functions/logger");
 // Create and deploy your first functions
 // https://firebase.google.com/docs/functions/get-started
 
 // exports.helloWorld = onRequest((request, response) => {
 //   logger.info("Hello logs!", {structuredData: true});
 //   response.send("Hello from Firebase!");
 // });
 const functions = require('firebase-functions');
 
 exports.login = functions.https.onRequest((request, response) => {
     if (auth.currentUser) {
         // User is signed in
         signInWithCredential(auth);
       } else {
         // No user is signed in; allows user to sign in
         ui.start('#firebaseui-auth-container', uiConfig);
       }
       response.send('Signed in successfully!');
 });
=======

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

exports.login = functions.https.onRequest(async (request, response) => {
  try {
    // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
    const { email, password } = request.body;

    // Simulate user sign-in using Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    // Create a custom token
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    response.status(200).json({ token: customToken, message: 'Signed in successfully!' });
  } catch (error) {
    console.error('Error during login:', error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.signup = functions.https.onRequest(async (req, res) => {
  try {

    // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
    const { email, password } = req.body;

    // Create a new user with email and password using the Admin SDK
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Optionally, you can do additional tasks like sending a welcome email or creating user-specific data

    res.status(201).json({ uid: userRecord.uid, message: 'User signed up successfully!' });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
>>>>>>> 6193c28c351ad06afe45cc24959d6a57ce1a3c22
