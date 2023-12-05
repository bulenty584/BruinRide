import './style.css';
import '../MainPage.css';
// Import stylesheets
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import TopBar from '../main_page/components/Topbar/Topbar';
import {AuthContext } from '../context/context';
import { useContext } from 'react';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
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
    console.log('error:', e);
  }

  var ui = new firebaseui.auth.AuthUI(getAuth());
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


export default function SignInOut() {
  const {login, logout, isLoggedIn} = useContext(AuthContext);
    // Add Firebase project configuration object here
      // FirebaseUI config
      const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
          // Email / Password Provider.
          GoogleAuthProvider.PROVIDER_ID        ],
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            login();
            // Handle sign-in.
            // Return false to avoid redirect.
            return false;
          }
        }
      };
      const uiConfig2 = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
          {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,

          },

        ],
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            login();
            // Handle sign-in.
            // Return false to avoid redirect.
            return false;
          }
        }
      };

    const [userSign, setUserSign] = useState(false);
    // Listen to RSVP button clicks

    //ui.start('#firebaseui-auth-container', uiConfig)

    const handleLoginProvider = () => {
      ui.start('#firebaseui-auth-container', uiConfig); 
    };
    const handleLoginGoogle = () => {
      // [START auth_google_signin_popup]
        // No user is signed in; allows user to sign in
        signInWithPopup(auth, provider)
          .then((result) => {
            login()
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("bub");
            // ...
          });
        } 
    const handleSignUp = () => {
      ui.start('#firebaseui-auth-container', uiConfig2);
    }

    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setUserSign(false);
          logout();
        })
        .catch((error) => {
          // An error happened.
          console.error("Error signing out: ", error);
        });
    }
    
  
  if(isLoggedIn()){
    return (
      <body>
          <div className="background-circles"></div>
          <TopBar />
          <div id="signinout">
              <div id="event-details-container">
                  <div className='buttons'>
                      <div className='description'>
                          <h1 className="welcome-message">Welcome to Bruin Ride</h1>
                          <div className='desc'>
                              You are logged in. Ready to find your next ride?
                          </div>
                      </div>
                      <button id="logoutButton" onClick={() => handleLogout()}>
                          <div className='bxicon'>Logout</div>
                      </button>
                  </div>
              </div>
          </div>
      </body>
  );
  } else {
  return (
    <body>
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
<div className="background-circles"></div>
<TopBar/>
  <div id="signinout">
      <div id="event-details-container">
        <div className='buttons'>
          <div className='description'>
            <div className='desc'>
                Choose your preferred location in the UCLA campus and we will help you find a ride!
            </div>
            <div className='desc'>
                Save money and time by carpooling with other Bruins!
            </div>
            <div className='desc'>
                Sign up now to start your journey!
            </div>
          </div>
          <button id="startRsvp2" onClick={()=>handleLoginGoogle()}>
            <div className='bxicon'>Continue with Google</div>
          </button>
          <button id="startRsvp" onClick={()=>handleSignUp()}>
              <div className='bx bx-envelope bx-sm bxicon' ></div>
              <div className='bxicon'>Sign Up with Email</div>
          </button>
      </div>
      <section id="firebaseui-auth-container"></section>
    </div>
  </div>
  </body>
  );
}
}
export {db, auth, };