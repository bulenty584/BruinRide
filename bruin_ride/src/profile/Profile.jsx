import React, { useState, useEffect } from 'react';
import TripList from './components/TripList';
import TopBar from '../main_page/components/Topbar/Topbar';


const Profile = () => {
  const [trips, setTrips] = useState([
    { pickupPoint: 'Carnesale Commons', dateTime: '2023-11-15T10:00:00Z', location: 'Trip 1', status: 'Completed'},
    { pickupPoint: 'Rieber Hall', dateTime: '2023-11-16T12:00:00Z', location: 'Trip 2', status: 'Completed' }
  ]);

  const currentTime = new Date();

  // Assuming dateTime is a string representation of a date and time (ISO 8601 formatted strings)
  const pastTrips = trips.filter((trip) => new Date(trip.dateTime) < currentTime);
  const currentTrips = trips.filter((trip) => new Date(trip.dateTime) >= currentTime);

  return (
    <div className="app">
      <TopBar />
      <TripList title="Current Trips" trips={currentTrips} />
      <TripList title="Past Trips" trips={pastTrips} />
    </div>

  );
};

export default Profile;
