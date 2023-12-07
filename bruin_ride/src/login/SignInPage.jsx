import {SignInOut} from './SignInOut';
import { useContext, useState} from 'react';
import {AuthContext} from '../context/context';
import {db, auth, provider} from './SignInOut';
import {signInWithEmailAndPassword} from 'firebase/auth';
import TopBar from '../main_page/components/Topbar/Topbar';
import { NavLink } from 'react-router-dom';
import './style.css'
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import {signInWithPopup} from 'firebase/auth';
import {
  getDocs,
  collection,
  query,
  where
} from 'firebase/firestore';


const SignInPage = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const {login, logout, isLoggedIn} = useContext(AuthContext);

  // Add Firebase project configuration object here
  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        login();
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };


  const handleLoginGoogle = () => {
    // [START auth_google_signin_popup]
      // No user is signed in; allows user to sign in
      signInWithPopup(auth, provider)
        .then((result) => {
          login();
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
          
          // ...
        });
      } 





  const signIn = (event) => {

    event.preventDefault();

    const username = event.target.email.value;
    const password = event.target.password.value;
    try{
        signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
        // Signed in
        login();
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        ;
      });


    } catch (error) {
      alert(error);
    }


    
  }
  const isUserPresent = async () => {
    console.log(auth.currentUser.uid);
    const q = query(collection(db, "phoneNumbers"), where("uid", "==", auth.currentUser.uid));

    let querySnapshot = null;
    try {
      querySnapshot = await getDocs(q);
    } catch (e) {
      alert('Error getting documents: ', e);
      return;
    }
    console.log(querySnapshot.empty);
    return !querySnapshot.empty;
  }

  return (
    <div className="sign-up-page">
      <TopBar />
      {!isLoggedIn() ? (
        <body>
      <form onSubmit={(event) => signIn(event)}>
        <div className="sign-in-input">
          <div className='desc'>
          Please enter an email and a password
          </div>
          <div className="email">
                  <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email'
                  required
                  onInput={null}
                />
          </div>
          <div className="password">
                  <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Password'
                  required
                  onInput={null}
                />
        </div>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
      <div>
      <button type="submit" className="submit-button" onClick={handleLoginGoogle}> Continue with Google</button>
      </div>
      </body>
  ) : (
    <div className="signed-in-page">
      <TopBar />
      <div className='desc'>
        You're logged in! You can now book a ride.
        <br></br>
        <br></br>
        <button className = "book_a_ride">
        <NavLink to="/bookride" className="nav-link">
        Book a ride
        </NavLink>
        </button>
      </div>
    </div>
  )}
  </div>
)};

export default SignInPage;