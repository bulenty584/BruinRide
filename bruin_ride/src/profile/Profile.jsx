import React, { useState, useEffect } from 'react';
import TripList from './components/TripList';
import TopBar from '../main_page/components/Topbar/Topbar';

const Profile = () => {
  const [trips, setTrips] = useState([
    { pickupPoint: 'Carnesale Commons', dateTime: '2023-11-15T10:00:00Z', status: 'Completed'},
    { pickupPoint: 'Rieber Hall', dateTime: '2023-11-16T12:00:00Z', status: 'Completed' }
  ]);

  const currentTime = new Date();
  const pastTrips = trips.filter((trip) => new Date(trip.dateTime) < currentTime);
  const currentTrips = trips.filter((trip) => new Date(trip.dateTime) >= currentTime);

  return (
    <div className="app">
      <header>
        <TopBar />
      </header>

      <main>
        <section>
          <h2>Current Trips</h2>
          {currentTrips.map((trip, index) => (
            <div key={index}>
              <div className="trip-box">
                <p>Pickup Point: {trip.pickupPoint}</p>
                <p>Date and Time: {new Date(trip.dateTime).toLocaleString()}</p>
                <p>Status: {trip.status}</p>
              </div>
              {index < currentTrips.length - 1 && <hr />} {/* Add HR except for the last trip */}
            </div>
          ))}
        </section>

        <section>
          <h2>Past Trips</h2>
          {pastTrips.map((trip, index) => (
            <div key={index}>
              <div className="trip-box">
                <p>Pickup Point: {trip.pickupPoint}</p>
                <p>Date and Time: {new Date(trip.dateTime).toLocaleString()}</p>
                <p>Status: {trip.status}</p>
              </div>
              {index < pastTrips.length - 1 && <hr />} {/* Add HR except for the last trip */}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Profile;

