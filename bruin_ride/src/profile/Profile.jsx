import '../MainPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../main_page/components/Topbar/Topbar';
import { auth, db } from '../login/SignInOut';
import plane from '../images/airplane.svg'
import {collection, query, getDocs } from 'firebase/firestore';
import './profile.css';

/* fine tune gradient, implement status and link to trip page */

const Profile = () => {
  const allTrips = async () => {
    const tripsRef = collection(db, 'trips');
    const q = query(tripsRef);
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      if(doc.data().groupMembers.includes(auth.currentUser.uid)){
        let trip = doc.data();
        trip.id = doc.id;
        trips.push(trip);
      }
    });
    return trips;
  };

  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent
    textDecoration: 'none', // Remove underline
  };

  const [currentTrips, setCurrentTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    allTrips()
      .then((result) => {
        const currentTime = new Date();
        const pastTrips = result.filter((trip) => new Date(trip.dateTime) < currentTime);
        const upcomingTrips = result.filter((trip) => new Date(trip.dateTime) >= currentTime);
        setPastTrips(pastTrips);
        setCurrentTrips(upcomingTrips);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
    <div className="app">
      <div className="background-circles"></div>
      <header> <TopBar /> </header>
      <main className='main'>
        <div className='tripsPage'>
          <div className="title">
            <p className='header'>Current Trips</p>
            <img className="plane" src={plane}/>
          </div>
          {currentTrips ? (
            currentTrips.map((trip) => (
              <div key={trip.id}>
                <Link to={`/trip_page/${trip.id}`} style={linkStyle}>
                  <div className="trip-box">
                    <div className="text">
                      <div className="trip-info">
                        <p>{`${trip.pickupLocation} -> LAX`}</p>
                        <br></br>
                        <p>{`date | ${[trip.dateTime.substr(0,10)].reverse()}`}</p>
                        <p>{`time | ${trip.dateTime.substr(11, 5)}`}</p>
                      </div>
                      <div className="status">
                        <p>status:</p>
                        <br></br>
                        <p className="statuslink">assigned</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading current trips...</p> // Show a loading message or spinner
          )}
           <div className="title">
            <p className='header'>Past Trips</p>
            <img className="plane" src={plane}/>
          </div>
          {pastTrips ? (
            pastTrips.map((trip) => (
              <div key={trip.id}>
                <Link to={`/trip_page/${trip.id}`} style={linkStyle}>
                  <div className="trip-box">
                    <div className="text">
                      <div className="trip-info">
                        <p>{`${trip.pickupLocation} -> LAX`}</p>
                        <br></br>
                        <p>{`date | ${trip.dateTime.substr(0,10)}`}</p>
                        <p>{`time | ${trip.dateTime.substr(11, 5)}`}</p>
                      </div>
                      <div className="status">
                        <p>status:</p>
                        <br></br>
                        <p className="statuslink">completed</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading past trips...</p> // Show a loading message or spinner
          )}
        </div>
      </main>
    </div>
    </>
  );
};

export default Profile;

