import '../MainPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../main_page/components/Topbar/Topbar';
import { db } from '../login/SignInOut';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, setDoc, where, getDocs } from 'firebase/firestore';
import './profile.css';

const Profile = () => {
  const allTrips = async () => {
    const tripsRef = collection(db, 'trips');
    const q = query(tripsRef);
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    return trips;
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = dateTime.toLocaleDateString(undefined, optionsDate);
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const time = dateTime.toLocaleTimeString(undefined, optionsTime);
    return { date, time };
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

  const renderTrips = (trips) => {
    return trips.map((trip) => (
      <div key={trip.id}>
        <Link to={`/trip_page/${trip.id}`} style={linkStyle}>
          <div className="trip-box">
            <h3>{`${trip.pickupLocation} to LAX`}</h3>
            {formatDateTime(trip.dateTime) && (
              <>
                <p>Date: {formatDateTime(trip.dateTime).date}</p>
                <p>Time: {formatDateTime(trip.dateTime).time}</p>
              </>
            )}
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <body>
      <div className="background-circles"></div>
      <div className="app">
        <header>
          <TopBar />
        </header>
        <main className='backTrips' style={{ paddingTop: '75px' }}>
          <div className='tripsPage'>
            <h2>Current Trips</h2>
            {renderTrips(currentTrips)}
            {currentTrips.length === 0 && <p>No current trips.</p>}
          </div>
          <div className='tripsPage'>
            <h2>Past Trips</h2>
            {renderTrips(pastTrips)}
            {pastTrips.length === 0 && <p>No past trips.</p>}
          </div>
        </main>
      </div>
    </body>
  );
};

export default Profile;
