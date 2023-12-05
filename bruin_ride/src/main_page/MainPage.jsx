import '../MainPage.css';
import React from 'react';
import image from '../images/homepage.svg'
import TopBar from './components/Topbar/Topbar';
import {NavLink } from 'react-router-dom';
import {auth, db} from '../login/SignInOut';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../context/context';
import { useContext } from 'react';


/* if signed in, change text to view ur upcoming trips, and my rides */



function MainPage() {

  const {login, logout, isLoggedIn} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return(
  
    <div className="App">
        <header className="background-circles"></header>
        <TopBar />
        <main className='main'>  
        <div class="hero-section">
          <div class="col">
            <div>
            <p className='header'>Ridesharing <br></br>made easy.</p>
            <p className='subheader'>from bruins, for bruins</p>
            </div>
            <NavLink to='/bookride' className="nav-link">
            <button>FIND A RIDE</button>
            </NavLink>
          </div>
          <div class="col">
          <img src={image}/>
          </div>
        </div>
        
          {isLoggedIn() ? (
             <div className="get-started">
              <p className="header2">View Your <br></br>Upcoming Trips</p>
                <NavLink to='/profile' className="nav-link">
                <button class="startbutton" onSubmit={(handleSubmit)}>
                  MY RIDES
                </button>
                </NavLink>
            </div>
          ) : (
            <div className="get-started">
              <p className="header2">Plan Your Next <br></br>Airport Ride Now</p>
              <NavLink to='/signIn' className="nav-link">
              <button class="startbutton" onSubmit={(handleSubmit)}>
                GET STARTED
              </button>
              </NavLink>
            </div>
          )}
      </main>
    </div>
)};


export default MainPage;