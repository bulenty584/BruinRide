import '../MainPage.css';
import React from 'react';
import image from '../images/homepage.svg'
import TopBar from './components/Topbar/Topbar';

/* if signed in, change text to view ur upcoming trips, and my rides */

function MainPage() {
  return(
    <div className="App">
        <div className="background-circles"></div>
        <TopBar />
        <main className='main'>  
        <div class="hero-section">
          <div class="col">
            <div>
            <p className='header'>Ridesharing <br></br>made easy.</p>
            <p className='subheader'>from bruins, for bruins</p>
            </div>
            <button>FIND A RIDE</button>
          </div>
          <div class="col">
          <img src={image}/>
          </div>
        </div>
        <div className="get-started">
          <p className="header2">Plan Your Next <br></br>Airport Ride Now</p>
          <button class="startbutton">GET STARTED</button>
        </div>
      </main>
    </div>
  );
}


export default MainPage;