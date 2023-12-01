import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TripList from './components/TripList';
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
    color: 'inherit', // Inherit the color from the parent
    textDecoration: 'none', // Remove underline
  };

  const [Trips, setTrips] = useState(null)

  useEffect(() => {
    allTrips().then((result) => {
      const currentTime = new Date();
      const pastTrips = result;
      setTrips(pastTrips); // Update state
    }).catch((error) => {
      console.error(error);
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="app">
      <header>
        <TopBar />
      </header>
      <main className='backTrips'>
        <div className='tripsPage'>
          <h2>Current Trips</h2>
          {Trips ? (
            Trips.map((trip) => (
              <div key={trip.uid}>
                <Link to={`/trip_page/${trip.id}`} style={linkStyle}>
                  <div className="trip-box">
                    <p> Name: {trip.name} </p>
                    <p>Pickup Point: {trip.pickupLocation}</p>
                    <p>Time: {trip.time}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading trips...</p> // Show a loading message or spinner
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;

