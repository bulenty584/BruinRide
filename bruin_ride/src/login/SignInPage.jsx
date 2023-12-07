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
  const [phoneNumber, setPhoneNumber] = useState('');

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


  const [signedInWithGoogle, setSignedInWithGoogle] = useState(false);
  const handleLoginGoogle = () => {
    setSignedInWithGoogle(true);
    // [START auth_google_signin_popup]
      // No user is signed in; allows user to sign in
      signInWithPopup(auth, provider)
        .then((result) => {
          login();
          isUserPresent().then(
            (result) => {
              console.log(result);
              if (!result) {
                setIsSubmitted(false);
              }
              else if (result) {
                setIsSubmitted(true);
              } 
              setPhoneNumber(''); 
            }
          );
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
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberSubmit = async (event) => {

    setIsLoading(true);
    event.preventDefault();
    try {
      
      const uid = auth.currentUser.uid;
      const cloudFunctionURL = `https://us-central1-bruinride-41c8c.cloudfunctions.net/updatePhoneNumber/allow-cors?uid=${uid}&phoneNumber=${phoneNumber}`;
  
      const response = await fetch(cloudFunctionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Phone number updated successfully');
        setIsSubmitted(true);
        setIsLoading(false);
        login();
        return;
      }
    } catch (error) {
      //console.error('Error submitting phone number:', error);
      isUserPresent().then(
        (result) => {
          console.log(result);
          if (!result) {
            setIsSubmitted(false);
          }
          else if (result) {
            setIsSubmitted(true);
          } 
        }
      );
      setIsLoading(false);
    } 
    setPhoneNumber(''); 
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // Ensure it's above everything else
};

  function formatPhoneNumber(event) {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
  
    if (input.length > 3 && input.length <= 6) {
      input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 6) {
      input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }
  
    event.target.value = input; 
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
              {isLoading && (
              <div style={overlayStyle}>
              <div>Loading...</div>
              </div>
              )} 
            <div id="signinout">
            <div id="event-details-container">
              <div className='buttons'>
                {/* Phone number input form */}
                {!isSubmitted && signedInWithGoogle ? (
                  <form onSubmit={(event) => handlePhoneNumberSubmit(event)}>

                    <div className="phone-input-container">
                      <div className='desc' style={{ paddingTop: '20px', borderRadius: '8px' }}>
                      Please enter your phone number below:
                      </div>
                      <div className="phone-form">
                              <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                              required
                              onInput={formatPhoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              value={phoneNumber} 
                            />
                      </div>
                    </div>
                    <div className="button-container">
                      <button type="submit" className="submit-button" style={{ marginTop: '20px',  marginBottom: '20px'}}>SUBMIT</button>
                    </div>
                    </form> 
                    ) : (
                    <div className='desc' style={{ paddingTop: '20px' }}>
                        You're logged in. Plan your next trip today!
                        <br></br>
                        <br></br>
                        <button className = "book_a_ride">
                        <NavLink to="/bookride" className="nav-link">
                        Book a ride
                        </NavLink>
                        </button>
                      </div>
                    )}
              </div>
          </div>
        </div>
        </div>
          )}
  </main>
  </div>
  </>
)};

export default SignInPage;