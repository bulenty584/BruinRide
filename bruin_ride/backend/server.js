// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set } from "firebase/database";
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';

import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import * as firebaseui from 'firebaseui';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


let db, auth;

  // Add Firebase project configuration object here
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
      initializeApp(firebaseConfig);
    }
    db = getFirestore();
    auth = getAuth();
  } catch (e) {
    console.log('error:', e);
    document.getElementById('app').innerHTML =
      '<h1>Welcome to the Codelab! Add your Firebase config object to <pre>/index.js</pre> and refresh to get started</h1>';
    throw new Error(
      'Welcome to the Codelab! Add your Firebase config object from the Firebase Console to `/index.js` and refresh to get started'
    );
  }

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };

  const ui = new firebaseui.auth.AuthUI(getAuth());

  // Listen to the current Auth state
  /*onAuthStateChanged(auth, (user) => {
    if (user) {

    } else {

    }
  });*/


/*
function writeUserData(userId, name, email) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
  });
}
writeUserData("Bulenty", "Bulent", "bulenty@ucla.edu")
*/

