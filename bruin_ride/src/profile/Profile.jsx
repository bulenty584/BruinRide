import './Profile.css';
import '../MainPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TripList from './components/TripList';
import TopBar from '../main_page/components/Topbar/Topbar';

const Profile = () => {
  const [trips, setTrips] = useState([
    { id: 1, pickupPoint: 'Carnesale Commons', dateTime: '2023-11-15T10:00:00Z', status: 'Completed', groupSize: 3, nameToEmail: { 'Delia': '(310) 693 - 3479', 'Bulent': '(310) 693 - 3479', 'Eduardo': '(310) 693 - 3479'}},
    { id: 2, pickupPoint: 'Rieber Hall', dateTime: '2023-11-16T12:00:00Z', status: 'Completed', groupSize: 3, nameToEmail: { 'Theo': '(310) 693 - 3479', 'Pratosh': '(310) 693 - 3479', 'Eduardo': '(310) 693 - 3479'}},
  ]);

  const currentTime = new Date();
  const pastTrips = trips.filter((trip) => new Date(trip.dateTime) < currentTime);
  const currentTrips = trips.filter((trip) => new Date(trip.dateTime) >= currentTime);

  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent
    textDecoration: 'none', // Remove underline
  };

  return (
    <body>
    <div className="background-circles"></div>
    <div className="app">
      <header>
        <TopBar />
      </header>

      <main>
        <section>
          <h2>Current Trips</h2>
          {currentTrips.map((trip) => (
            <div key={trip.id}>
              <Link to={`/trip_page/${trip.id}`} style={linkStyle}>
                <div className="trip-box">
                  <p>Pickup Point: {trip.pickupPoint}</p>
                  <p>Date and Time: {new Date(trip.dateTime).toLocaleString()}</p>
                  <p>Status: {trip.status}</p>
                </div>
              </Link>
            </div>
          ))}
        </section>

        <section>
          <h2>Past Trips</h2>
          {pastTrips.map((trip) => (
            <div key={trip.id}>
              <Link to={`/trip_page/${trip.id}`} style={linkStyle}>
                <div className="trip-box">
                  <p>Pickup Point: {trip.pickupPoint}</p>
                  <p>Date and Time: {new Date(trip.dateTime).toLocaleString()}</p>
                  <p>Status: {trip.status}</p>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
    </body>
  );
};

export default Profile;

