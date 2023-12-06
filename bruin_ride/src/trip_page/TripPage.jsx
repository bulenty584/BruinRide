import './TripPage.css'
import '../MainPage.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../login/SignInOut';
import {collection, query, getDoc, doc } from 'firebase/firestore';
import TopBar from '../main_page/components/Topbar/Topbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import phone from '../images/phone.svg'
import plane from '../images/airplane.svg'
import { format, utcToZonedTime } from 'date-fns-tz';

const TripPage = () => {
  const [selectedTrip, selectTrip] = useState(null)
  const { tripId } = useParams();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);

  // Function to convert ISO 8601 to date (MM/DD/YYYY)
function convertISOToDateString(isoDateString) {
  const date = new Date(isoDateString);

  // Extracting individual components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Creating the MM/DD/YYYY format
  const mmddyyyy = `${month}/${day}/${year}`;

  return mmddyyyy;
}

// Function to convert ISO 8601 to time (HH:MM:SS)
function convertISOToTimeString(utcISOString) {
  const utcDate = new Date(utcISOString);

  // Convert UTC date to PST
  const pstTimeString = format(utcDate, 'HH:mm', { timeZone: 'America/Los_Angeles' });

  return pstTimeString;
}


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


const getGroupMembers = async (tripId) => {
  try {
    const trip = await getTrip(tripId);

    if (trip && trip.groupMembers) {
      return trip.groupMembers;
    } else {
      console.warn('No group members found for the current trip.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching group members:', error.message);
    throw error;
  }
};
  console.log(selectedTrip);

  useEffect(() => {
    const fetchTripAndGroupMembers = async () => {
      try {
        const tripData = await getTrip();
        if (tripData) {
          selectTrip(tripData);
          setGroupMembers(await getGroupMembers(tripData.id));
        }
      } catch (error) {
        // Handle error appropriately, e.g., display an error message to the user
      }
    };

    fetchTripAndGroupMembers();
    console.log(selectedTrip);
    console.log(groupMembers);
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
    
    <div className="app">
      <div className="background-circles"></div>

      <header>
        <TopBar />
      </header>
      <main className="main">
      {selectedTrip ? (
      <div className='tripsPage'>
          <div className="title">
            <p className='header'>Trip details</p>
            <img className="plane" src={plane}/>
          </div>
              <div className="trip-details">
                  <div className="left">
                    <div className="trip-info">
                          <p>{`${selectedTrip.pickupLocation} -> LAX`}</p>
                          <br></br>
                          <p>{`${convertISOToDateString(selectedTrip.dateTime)}, ${convertISOToTimeString(selectedTrip.dateTime)}`}</p>
                    </div>
                    <div> <img className="phone" src={phone}/> </div>
                  </div>
                  <div class="vertical-line"></div>
                  <div className="right">
                    {selectedTrip.groupSet  ? (
                      <div>
                        {/* HTML to display when status is assigned */}
                        <p className="display-text">Your group has been assigned:</p>
                        <div className="name-phone-list">
                          <div className="names">
                            <p style={{ color: 'white', fontWeight: 600 }}>Name</p>
                            {selectedTrip.name.map((name, index) => ( <p key={index}>{name}</p> ))}
                          </div>
                          <div className="phones">
                            <p style={{ color: 'white', fontWeight: 600 }}>Phone</p>
                            {/* {phoneNumbers.map((phoneNumber, index) => ( <p key={index}>{phoneNumber}</p> ))} */}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* HTML to display when status is unassigned */}
                        <p className="display-text">We are currently trying to match you <br></br>to a group. Please check back later.</p>
                      </div>
                    )}
                  </div>
              </div>
          <Link to="/profile" style={{ display: 'block', marginTop: '40px' }}>
          <button className="goback">back to all trips</button>
        </Link>
      </div>
       ) : (
        <p>Loading...</p> // Render a loading message or another UI while data is being fetched
      )}
      </main>
  
        
       
  </div>
  )
};

export default TripPage;