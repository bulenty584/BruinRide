import React from 'react';

const TripBox = ({ pickupPoint, dateTime, status }) => (
  <div className="trip-box">
    <h2>{pickupPoint} -> LAX</h2>
    <p>Date & Time: {dateTime}</p>
    <p>Status: {status}</p>
  </div>
);

export default TripBox;