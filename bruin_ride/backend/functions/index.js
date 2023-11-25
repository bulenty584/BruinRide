/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

 const {onCall} = require("firebase-functions/v1/https");
 const {onDocumentWritten} = require("firebase-functions/v1/firestore");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({origin: true});

admin.initializeApp();

const app = express();
app.use(cors);



exports.login = functions.https.onRequest(async (request, response) => {

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  response.setHeader('Access-Control-Allow-Credentials', true); // If needed
  try {
    // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
    const { email, password } = request.body;

    // Simulate user sign-in using Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);


    // Create a custom token
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    if (userRecord.password != password) {
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
