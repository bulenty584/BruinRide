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
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.signup = functions.https.onRequest(async (req, res) => {
  try {
    logger.log('req', req);
    logger.log('req.body', req.body);
    logger.log('req.body.email', req.body.email);
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
