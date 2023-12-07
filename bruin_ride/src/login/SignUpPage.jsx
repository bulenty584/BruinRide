import {SignInOut} from './SignInOut';
import { useContext } from 'react';
import {AuthContext} from '../context/context';
import {db, auth, provider} from './SignInOut';
import TopBar from '../main_page/components/Topbar/Topbar';
import { NavLink } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from 'react';
import {signInWithPopup} from 'firebase/auth';
import './signin.css';
import '../MainPage.css';

import {
  getDocs,
  collection,
  query,
  where
} from 'firebase/firestore';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const NAME_REGEX = /^[A-Z][a-z]+ [A-Z][a-z]+$/;



const SignUpPage = () => {

  const {login, logout, isLoggedIn} = useContext(AuthContext);
  const [signedInWithGoogle, setSignedInWithGoogle] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');
  const [validMail, setValidMail] = useState(false);

  const [validName, setValidName] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setValidMail(EMAIL_REGEX.test(mail));
}, [mail])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
}, [pwd])

useEffect(() => {
  setValidName(NAME_REGEX.test(name));
}, [name])



  const signUp = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const username = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const phoneNumber = event.target.phoneNumber.value;
    try{
      if (!validMail) {
        logout();
        alert('Please enter a valid email address');
        return;
      }

      if (!validPwd) {
        logout();
        alert('Please enter a valid password');
        return;
      }

      if (!validName) {
        logout();
        alert('Please enter a valid name');
        return;
      }
      
      createUserWithEmailAndPassword(auth, username, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email = user.email;
        login();
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          handlePhoneNumberSubmit(event);
        }).catch((error) => {
          // An error occurred
          
          alert(error);
          
        });
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        logout();

        return;
      });


    } catch (error) {
      alert(error);
      logout();
      return;
    } 
    setName('');
    setPhoneNumber('');
    setPwd('');
    setMail('');
    setIsLoading(false);
  }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        try {
      
          if (!phoneNumber) {
            alert('Please enter a valid phone number');
            setIsLoading(false);
            return;
          }
          
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
  const handleLoginGoogle = () => {
    // [START auth_google_signin_popup]
      // No user is signed in; allows user to sign in
      setSignedInWithGoogle(true);
      signInWithPopup(auth, provider)
        .then((result) => {
          login();
          const existingUser = isUserPresent().then(
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
  return (
    <>
    <div className="app">
      <div className="background-circles"></div>
      <header> <TopBar /> </header>
      <main className='main'>
        <div className="signin-title-div"><p className='signin-title'>Create an account</p></div>
        <div className="sign-up-page">
          {!isLoggedIn() ? (
            <>
          <form onSubmit={(event) => signUp(event)}>
            <div className="sign-in-input">
              <div className='desc'>
              Please choose an email and password
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
            <div className="signinbox">
                      <input
                      type="name"
                      id="name"
                      name="name"
                      placeholder='Name'
                      required
                      onInput={null}
                    />
            </div>
            <div className="phone-input-container">
                <div className='desc'>
                </div>
                <div className="signinbox">
                        <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='Phone Number'
                        pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                        required
                        onInput={formatPhoneNumber}
                      />
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
          <div>
          <button type="submit" className="submit-button" onClick={handleLoginGoogle}>Continue with Google</button>
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
                      <div className='desc'>
                      Please enter your phone number below (no special characters or spaces) and proceed to book your next ride!
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
                      <button type="submit" className="submit-button">Submit</button>
                    </div>
                    </form> 
                    ) : (
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
                    )
                  }
              </div>
          </div>
        </div>
      </div>
    )}
  </div>
  </main>
  </div>
  </>
)};

export default SignUpPage;