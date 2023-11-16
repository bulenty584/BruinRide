import React, { useState, useEffect } from 'react';
import TripList from './TripList';

const App = () => {
  const [trips, setTrips] = useState([]);

    setTrips(trips);
     //TODO: get all trips (past and current) from backend];

const currentTime = new Date();

// Assuming dateTime is a string representation of a date and time (ISO 8601 formatted strings)
const pastTrips = trips.filter((trip) => new Date(trip.dateTime) < currentTime);
const currentTrips = trips.filter((trip) => new Date(trip.dateTime) >= currentTime);

  return (
    <div className="app">
      <TripList title="Current Trips" trips={currentTrips} />
      <TripList title="Past Trips" trips={pastTrips} />
    </div>
  );
};

export default App;
