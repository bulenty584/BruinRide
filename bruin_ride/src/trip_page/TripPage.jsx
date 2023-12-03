// TripPage.js
import './TripPage.css'
import '../MainPage.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../login/SignInOut';
import {collection, query, getDocs } from 'firebase/firestore';
import TopBar from '../main_page/components/Topbar/Topbar';

const TripPage = ({trips}) => {
  const [selectedTrip, selectTrip] = useState(null)
  const allTrips = async () => {
    const tripsRef = collection(db, 'trips');
    const q = query(tripsRef);
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    return trips;
  }
  

  console.log(trips)
  
  const { tripId } = useParams();
  console.log(tripId)

  

  useEffect(() => {
    allTrips().then((result) => {
      const currentTime = new Date();
      const pastTrips = result;
      console.log(pastTrips);
      selectTrip(pastTrips); // Update state
      console.log(tripId)
    }).catch((error) => {
      console.error(error);
    });
  }, []); 

  console.log(selectedTrip)

  // Convert nameToEmail object into arrays of names and phone numbers
  const names = selectedTrip.map((trip) => trip.name);
  //const phoneNumbers = nameToPhoneNumberEntries.map(([, phoneNumber]) => phoneNumber);

  return (
    
    <div>
      <div className="background-circles"></div>

      <header>
        <TopBar />
      </header>

      <div style={{ padding: '20px', marginTop: '50px' }}>
        <h2>Trip Details</h2>
        <p>Pickup Point: {selectedTrip.pickupLocation}</p>
        <p>Date and Time: {new Date(selectedTrip.time).toLocaleString()}</p>
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
              {/* {phoneNumbers.map((phoneNumber, index) => (
                <p key={index}>{phoneNumber}</p>
              ))} */}
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
