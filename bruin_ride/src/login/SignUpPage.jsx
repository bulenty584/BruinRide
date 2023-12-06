import {SignInOut} from './SignInOut';
import { useContext } from 'react';
import {AuthContext} from '../context/context';
import {db, auth} from './SignInOut';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import TopBar from '../main_page/components/Topbar/Topbar';

const SignUpPage = () => {

  const {login, logout, isLoggedIn} = useContext(AuthContext);

  const signUp = (event) => {

    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    try{
      createUserWithEmailAndPassword(auth, username, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        return;
      });
    } catch (error) {
      alert(error);
    }


    
  }

  return (
    <div className="sign-up-page">
      <TopBar />
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
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  )
};

export default SignUpPage;