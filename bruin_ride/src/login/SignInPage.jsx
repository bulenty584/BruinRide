import {SignInOut} from './SignInOut';
import { useContext } from 'react';
import {AuthContext} from '../context/context';
import {db, auth} from './SignInOut';
import {signInWithEmailAndPassword} from 'firebase/auth';
import TopBar from '../main_page/components/Topbar/Topbar';
import { NavLink } from 'react-router-dom';
import './SignUpPage.css'
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebaseui from 'firebaseui';

const SignInPage = () => {

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

  const signUp = (event) => {

    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    try{
        signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
        // Signed in
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

  return (
    <div className="sign-up-page">
      <TopBar />
      {!isLoggedIn() ? (
        <body>
      <form onSubmit={(event) => signUp(event)}>
        <div className="sign-in-input">
          <div className='desc'>
          Please Enter a username and password
          </div>
          <div className="username">
                  <input
                  type="username"
                  id="username"
                  name="username"
                  placeholder='Username'
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