import './style.css';
// Import stylesheets
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import TopBar from '../main_page/components/Topbar/Topbar';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  where
} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';


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
      }
    
      // FirebaseUI config
      const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
          // Email / Password Provider.
          EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // Handle sign-in.
            // Return false to avoid redirect.
            return false;
          }
        }
      };
      const ui = new firebaseui.auth.AuthUI(getAuth());
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

      
export default function SignInOut() {
    const [userSign, setUserSign] = useState(false);
    // Listen to RSVP button clicks
    const handleLoginGoogle = () => {
        // No user is signed in; allows user to sign in
        signInWithRedirect(auth, provider)
          .then((result) => {
            setUserSign(true);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    };  
    const handleSignIn = () => {
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    
  return (
    <>
    <>
  <meta charSet="utf-8" />
  <title>BruinRide Login</title>
  <link
    type="text/css"
    rel="stylesheet"
    href="https://cdn.firebase.com/libs/firebaseui/4.0.0/firebaseui.css"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Roboto:300,400,700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</>

  <div id="app">
    <section id="event-details-container">
        <TopBar/>
      <button id="startRsvp" onClick={()=>handleLoginGoogle()}>Sign in with Google</button>
      <button id="startRsvp" onClick={()=>handleSignIn()}>Sign in with Email</button>
    </section>

    <hr />

    <section id="firebaseui-auth-container"></section>

  </div>
  </>
  );
}
