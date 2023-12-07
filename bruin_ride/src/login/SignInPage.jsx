import {SignInOut} from './SignInOut';
import { useContext, useState} from 'react';
import {AuthContext} from '../context/context';
import {db, auth, provider} from './SignInOut';
import {signInWithEmailAndPassword} from 'firebase/auth';
import TopBar from '../main_page/components/Topbar/Topbar';
import { NavLink } from 'react-router-dom';
import './signin.css';
import '../MainPage.css';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import {signInWithPopup} from 'firebase/auth';

import google from '../images/google.svg';

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
          logout();
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
    <>
    <div className="app">
      <div className="background-circles"></div>
      <header> <TopBar /> </header>
      <main className='main'>
       
          {!isLoggedIn() ? (
            <>
             <div className="signin-title-div"><p className='signin-title'>Log into your account</p></div>
              <div className="sign-up-page">
            <form className="formcontainer" onSubmit={(event) => signIn(event)}>
              <div className="sign-in-input">
                <div className="signinbox-google" onClick={handleLoginGoogle}>
                  <div className="google-title">
                    <img className="google" src={google}/>
                    <p> Log in with Google</p>
                  </div>
                </div>

                <div class="line-with-or">
                  <div class="line"></div>
                  <span class="or">OR</span>
                  <div class="line"></div>
                </div>
               
                <div className="signinbox">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        required
                        onInput={null}
                      />
                </div>
                <div className="signinbox">
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
                <button type="submit" className="submit-button">LOG IN</button>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px' }}>
                <p style={{ margin: '0' }}>Don't have an account?</p>
                <NavLink to='/signIn' className="nav-link" style={{ marginLeft: '5px', fontWeight: '500', color: '#C6FBB9' }}>Register now!</NavLink>
              </div>

           
            </form>
            </div>

          </>
          ) : (
          <div className="signed-in-page">
            <div className='desc' style={{ paddingTop: '20px' }}>
              You're logged in. Plan your next trip today!
              <br></br>
              <br></br>
              <button className = "book_a_ride">
              <NavLink to="/bookride" className="nav-link">
              book a ride
              </NavLink>
              </button>
            </div>
          </div>
      )}

    </main>
  </div>

  </>
)};

export default SignInPage;