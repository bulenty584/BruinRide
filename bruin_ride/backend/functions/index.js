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

admin.initializeApp();

const app = express();
app.use(cors());


exports.login = functions.https.onRequest(async (request, response) => {

  cors(async (request, response) => { 
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
});


exports.signup = functions.https.onRequest(async (req, res) => {
  cors(async(req, res) => { 
    try {
      // Extract user credentials from the request (ensure you handle this securely in a real-world scenario)
      const { email, password } = req.body;
  
      console.log(email);
  
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
});
