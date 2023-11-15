import './style.css';
// Import stylesheets
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
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

// Document elements

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


export default function Login() {
    // Listen to RSVP button clicks
    const handleLoginGoogle = () => {
        // No user is signed in; allows user to sign in
        auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
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
    const handleLogin = () => {
        ui.start('#firebaseui-auth-container', uiConfig);
    }
  return (
    <>
    <>
  <meta charSet="utf-8" />
  <title>Firebase Meetup</title>
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
    <img
      src="https://firebasestorage.googleapis.com/v0/b/fir-images-a61c9.appspot.com/o/codelab.png?alt=media&token=f45f808c-ce40-4b34-944c-8d8fac00e13d"
    />

    <section id="event-details-container">
      <h1>Firebase Meetup</h1>

      <p><i className="material-icons">calendar_today</i> October 30</p>
      <p><i className="material-icons">location_city</i> San Francisco</p>
      <button id="startRsvp" onClick={()=>handleLoginGoogle()}>Sign in with Google</button>
      <button id="startRsvp" onClick={()=>handleLogin()}>Sign in with Email</button>
    </section>

    <hr />

    <section id="firebaseui-auth-container"></section>

    <section id="description-container">
      <h2>What we'll be doing</h2>
      <p>Join us for a day full of Firebase Workshops and Pizza!</p>

      <p id="number-attending"></p>
    </section>
  </div>
  </>
  );
}
