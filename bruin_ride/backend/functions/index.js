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
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

exports.login = functions.https.onRequest(async (request, response) => {
  try {
    // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
    const { email, password } = request.body;

    // Simulate user sign-in using Firebase Authentication
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);

    // Do something with the userCredential, like generate and return a custom token
    const customToken = await admin.auth().createCustomToken(userCredential.user.uid);

    response.status(200).json({ token: customToken, message: 'Signed in successfully!' });
  } catch (error) {
    console.error('Error during login:', error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
