// TripPage.js
import './TripPage.css'
import '../MainPage.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../login/SignInOut';
import {collection, query, getDoc, doc } from 'firebase/firestore';
import TopBar from '../main_page/components/Topbar/Topbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const TripPage = () => {
  const [selectedTrip, selectTrip] = useState(null)
  const { tripId } = useParams();

  const getTrip = async () => {
    // const collectionRef = collection(db, 'trips');
    // // Use the doc method to get a DocumentReference for the specified document
    // const documentRef = collectionRef.doc(tripId);
    // // Use the get method to retrieve the document
    // console.log(documentRef);
    // documentRef.get()
    //   .then((documentSnapshot) => {
    //     if (documentSnapshot.exists()) {
    //       // Document found, you can access its data
    //       selectTrip(documentSnapshot.data());
    //     } else {
    //       console.log('Document does not exist');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error getting document:', error);
    //   });
     const docRef = doc(db, "trips", tripId);
     const docSnap = await getDoc(docRef);
     selectTrip(docSnap.data());
  };

  useEffect(() => {
    getTrip()
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Convert nameToEmail object into arrays of names and phone numbers
  //const names = selectedTrip.groupMembers.map((user) => user.name);

  // const names = [];
  // if (selectedTrip !== null) {
  //   for (const user of selectedTrip.groupMembers) {
  //     const dbUser = auth.getUser(user);
  //     names.push(dbUser.getDisplayName());
  //   }
  // }
  //const phoneNumbers = nameToPhoneNumberEntries.map(([, phoneNumber]) => phoneNumber);

  return (
    
    <div>
      <div className="background-circles"></div>

      <header>
        <TopBar />
      </header>
      { selectedTrip === null ? <h2>Loading...</h2> :
      <div style={{ padding: '20px', marginTop: '50px' }}>
        <h2 style={{marginTop: '5%'}}>Trip Details</h2>
        <p>Pickup Point: {selectedTrip.pickupLocation}</p>
        <p>Date and Time: {new Date(selectedTrip.dateTime).toLocaleString()}</p>
        <p>Status: {selectedTrip.groupSet ? "Assigned" : "Unassigned"}</p>
        <p>Group Size: {selectedTrip.groupSize}</p>

        {/* Render Your Group header and parallel lists */}
        <div>
          <h3 style={{ marginTop: "58px"}}>Your Group</h3>
          <div style={{ display: 'flex', marginLeft: '30%', marginTop: "28px"}}>
            {/* List of names */}
            <div style={{ marginRight: '20px' }}>
              <h4>Names</h4>
              {selectedTrip.name.map((name, index) => ( <p key={index}>{name}</p> ))}
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
        <Link to="/profile" style={{ display: 'block', marginTop: '40px' }}>
          <button>Back to All Trips</button>
        </Link>
      </div>
      }
    </div>
  );
};

export default TripPage;
