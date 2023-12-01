// TripPage.js
import './TripPage.css'
import '../MainPage.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../main_page/components/Topbar/Topbar';

const TripPage = ({ trips }) => {
  const [testTrips, setTestTrips] = useState([
    { id: 1, pickupPoint: 'Carnesale Commons', dateTime: '2023-11-15T10:00:00Z', status: 'Completed', groupSize: 3, nameToEmail: { 'Delia': '(310) 693 - 3479', 'Bulent': '(310) 693 - 3479', 'Eduardo': '(310) 693 - 3479'}},
    { id: 2, pickupPoint: 'Rieber Hall', dateTime: '2023-11-16T12:00:00Z', status: 'Completed', groupSize: 3, nameToEmail: { 'Theo': '(310) 693 - 3479', 'Pratosh': '(310) 693 - 3479', 'Eduardo': '(310) 693 - 3479'}},
  ]);
  const { tripId } = useParams();
  const selectedTrip = testTrips.find((trip) => trip.id === parseInt(tripId));

  if (!selectedTrip) {
    return <div>Trip not found</div>;
  }

  // Convert nameToEmail object into arrays of names and phone numbers
  const nameToPhoneNumberEntries = Object.entries(selectedTrip.nameToEmail);
  const names = nameToPhoneNumberEntries.map(([name]) => name);
  const phoneNumbers = nameToPhoneNumberEntries.map(([, phoneNumber]) => phoneNumber);

  return (
    
    <div>
      <div className="background-circles"></div>

      <header>
        <TopBar />
      </header>

      <div style={{ padding: '20px', marginTop: '50px' }}>
        <h2>Trip Details</h2>
        <p>Pickup Point: {selectedTrip.pickupPoint}</p>
        <p>Date and Time: {new Date(selectedTrip.dateTime).toLocaleString()}</p>
        <p>Status: {selectedTrip.status}</p>
        <p>Group Size: {selectedTrip.groupSize}</p>

        {/* Render Your Group header and parallel lists */}
        <div>
          <h3>Your Group</h3>
          <div style={{ display: 'flex' }}>
            {/* List of names */}
            <div style={{ marginRight: '20px' }}>
              <h4>Names</h4>
              {names.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </div>

            {/* List of phone numbers */}
            <div>
              <h4>Phone Numbers</h4>
              {phoneNumbers.map((phoneNumber, index) => (
                <p key={index}>{phoneNumber}</p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Back to All Trips button */}
        <Link to="/profile" style={{ display: 'block', marginTop: '20px' }}>
          <button>Back to All Trips</button>
        </Link>
      </div>
    </div>
  );
};

export default TripPage;
