import '../MainPage.css';
import React from 'react';
import image from '../images/homepage.svg'
import TopBar from './components/Topbar/Topbar';
import {NavLink } from 'react-router-dom';

/* if signed in, change text to view ur upcoming trips, and my rides */

function MainPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const user = localStorage.getItem('userSign');

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
        
          {user ? (
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