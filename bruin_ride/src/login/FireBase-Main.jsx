import '../MainPage.css';
// Import stylesheets
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

let db, auth;
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
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    }
    auth = getAuth();
  } catch (e) {
    alert('error:', e);
  }

  export const ui = new firebaseui.auth.AuthUI(getAuth());
  export const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  export const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      GoogleAuthProvider.PROVIDER_ID        ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        //login();
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  
export {db, auth, firebaseui};