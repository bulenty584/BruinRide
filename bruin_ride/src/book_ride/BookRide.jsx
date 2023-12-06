import React, { useState, useCallback, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from '../main_page/components/Topbar/Topbar';
import './bookride.css';
import {db, auth} from "../login/SignInOut";
import {addDoc, collection } from 'firebase/firestore';
import map from '../images/map.svg'
import { AuthContext } from "../context/context";
import { useContext } from 'react';


/* change photo of the map with actual map api */

const DateInput = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM-dd-yyyy"
      placeholderText="Select date"
    />
  );
};

const TimeInput = ({ selectedTime, handleTimeChange }) => {
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeSlot);
    }
  }

  return (
    <select value={selectedTime} onChange={handleTimeChange}>
      <option value="" disabled>
        Select time
      </option>
      {timeSlots.map((timeSlot) => (
        <option key={timeSlot} value={timeSlot}>
          {timeSlot}
        </option>
      ))}
    </select>
  );
};

const PickupSpotInput = ({ selectedPickupSpot, handlePickupSpotChange }) => {
  const pickupSpots = ['De Neve', 'Carnesale Commons', 'Rieber Terrace', 'Hedrick/Hitch','Gayley Avenue'];

  return (
    <select value={selectedPickupSpot} onChange={handlePickupSpotChange}>
      <option value="" disabled>
        Choose pickup location
      </option>
      {pickupSpots.map((spot) => (
        <option key={spot} value={spot}>
          {spot}
        </option>
      ))}
    </select>
  );
};

const BookRide = () => {
  const {TripAdded, isTripAdded} = useContext(AuthContext);
  const [selectedDate, setDate] = useState(null);
  const [selectedTime, setTime] = useState('');
  const [selectedPickupLocation, setPickupLocation] = useState('');
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  
    if (!selectedDate || !selectedTime || !selectedPickupLocation) {
      console.error('Please fill in all fields');
      return;
    }
  
    const combinedDateTime = new Date(selectedDate.toISOString().split('T')[0] + 'T' + selectedTime);

    const currentDate = new Date();

    if(currentDate > combinedDateTime){
      alert('Cannot book a ride for a past date and time. Please choose a future date and time.');
      return;
    }

    const iso8601String = combinedDateTime.toISOString();
  
    console.log(`Date and Time: ${iso8601String}, Pickup Location: ${selectedPickupLocation}`);

    const getGroup = async () => {
      const name = auth.currentUser.displayName;
      try{
        const uid = auth.currentUser.uid;
        const cloudFunctionURL = `https://us-central1-bruinride-41c8c.cloudfunctions.net/algo/allow-cors?database=${db}&dateTime=${iso8601String}&location=${selectedPickupLocation}&uid=${uid}&name=${name}`;

        const response = await fetch(cloudFunctionURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          });

          if (response.ok){
            const data = await response.json();
            TripAdded();

            
            console.log(data);
          }

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      } catch (error) {
        console.log(error);
      }
    };

  
    // const publishData = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "trips"), {
    //       userId : auth.currentUser.uid,
    //       dateTime: iso8601String,
    //       pickupLocation: selectedPickupLocation,
    //       groupSet: false,
    //       groupSize: 1,
    //       groupMembers: [],

    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // };


    getGroup();
    //publishData();
  
    setDate(null);
    setTime('');
    setPickupLocation('');
  }, [selectedDate, selectedTime, selectedPickupLocation]);
  

  return (
    <div className="app">
      <div className="background-circles"></div>
      <header className="navbar"> <TopBar /> </header>
      <main className='bookpage'>
      <p className='header'>Plan your next trip to LAX</p>
      <div className='bookform'>
        <div className="map">
          <iframe src="https://storage.googleapis.com/maps-solutions-6o7tjf0tor/locator-plus/tyje/locator-plus.html"
          width="100%"
          height="100%" // Set your desired height here
          style={{ border: '5px solid #C6FBB9', boxShadow: '0 0 50px rgba(198, 251, 185, 0.4)', borderRadius: '5px'}}
          loading="lazy"
          title="Google Map">
          </iframe>
        </div>
        <div className='booking-container'>
        <form>
          <label className="box">
            <DateInput selectedDate={selectedDate} handleDateChange={(date) => setDate(date)} />
          </label>
          <br />
          <label className="box">
            <TimeInput selectedTime={selectedTime} handleTimeChange={(e) => setTime(e.target.value)} />
          </label>
          <br />
          <label className="box">
            <PickupSpotInput
              selectedPickupSpot={selectedPickupLocation}
              handlePickupSpotChange={(e) => setPickupLocation(e.target.value)}
            />
          </label>
          <br />
          <button className="submit-button" type="submit" onClick={(handleSubmit)}>SUBMIT</button>
        </form>
    </div>
      </div>
      </main>
    </div>
    
  );
};

export default BookRide;
