import React from 'react';
import TripBox from './TripBox';

const TripList = ({ title, trips }) => (
  <div className="trip-list">
    <h1>{title}</h1>
    {trips.map((trip, index) => (
      <TripBox key={index} {...trip} />
    ))}
  </div>
);

export default TripList;