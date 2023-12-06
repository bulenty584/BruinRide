import {SignInOut} from './SignInOut';
import { useContext } from 'react';
import {AuthContext} from '../context/context';
import {db, auth, provider} from './SignInOut';
import TopBar from '../main_page/components/Topbar/Topbar';
import { NavLink } from 'react-router-dom';
import './SignUpPage.css'
import { GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import {signInWithPopup} from 'firebase/auth';
import {
  getDocs,
  collection,
  query,
  where
} from 'firebase/firestore';



const SignUpPage = () => {

  const {login, logout, isLoggedIn} = useContext(AuthContext);

  const signUp = (event) => {

    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    try{
      createUserWithEmailAndPassword(auth, username, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        login();
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          
          alert(error);
          
        });
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
  }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        try {
          const phoneNumber = event.target.phoneNumber.value;
      
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
          }
        } catch (error) {
          //console.error('Error submitting phone number:', error);
          setIsSubmitted(false);
          setIsLoading(false);
        } 
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
    <div className="sign-up-page">
      <TopBar />
      {!isLoggedIn() ? (
        <body>
      <form onSubmit={(event) => signUp(event)}>
        <div className="sign-in-input">
          <div className='desc'>
          Please choose a username and password
          </div>
          <div className="username">
                  <input
                  type="username"
                  id="username"
                  name="username"
                  required
                  onInput={null}
                />
          </div>
          <div className="password">
                  <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onInput={null}
                />
        </div>
        <div className="name">
                  <input
                  type="name"
                  id="name"
                  name="name"
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
      <button type="submit" className="submit-button" onClick={handleLoginGoogle}>Continue with Google</button>
      </div>
    </body>

  ) : (
    <div className="signed-in-page">
      <TopBar />
        <body>
         {isLoading && (
          <div style={overlayStyle}>
            <div>Loading...</div>
          </div>
          )} 
          <div className="background-circles"></div>
          <TopBar />
          <div id="signinout">
            <div id="event-details-container">
              <div className='buttons'>
                {/* Phone number input form */}
                {!isSubmitted ? (
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
      </body>
      </div>
    )}
  </div>
)};

export default SignUpPage;