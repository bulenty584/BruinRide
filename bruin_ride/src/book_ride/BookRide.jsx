import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from '../main_page/components/Topbar/Topbar';
import './bookride.css';
import {db, auth} from "../login/SignInOut"
import {addDoc, collection } from 'firebase/firestore';


const DateInput = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select Date"
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
        Select Time
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
  const pickupSpots = ['De Neve', 'Rieber Terrace', 'Carnesale Commons', 'Holly/Gayley'];

  return (
    <select value={selectedPickupSpot} onChange={handlePickupSpotChange}>
      <option value="" disabled>
        Select Pickup Spot
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
  const [selectedDate, setDate] = useState(null);
  const [selectedTime, setTime] = useState('');
  const [selectedPickupLocation, setPickupLocation] = useState('');
  const handleSubmit = (event) => {
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
      try{
        const uid = auth.currentUser.uid;
        const cloudFunctionURL = `https://us-central1-bruinride-41c8c.cloudfunctions.net/algo/allow-cors?database=${db}&dateTime=${iso8601String}&location=${selectedPickupLocation}&uid=${uid}`;

        const response = await fetch(cloudFunctionURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          });

          if (response.ok){
            const data = await response.json();
            console.log(data);
          }

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      } catch (error) {
        console.log(error);
      }
    };

  
    const publishData = async () => {
      try {
        const docRef = await addDoc(collection(db, "trips"), {
          userId : auth.currentUser.uid,
          dateTime: iso8601String,
          pickupLocation: selectedPickupLocation,
          groupSet: false,
          groupSize: 1,
          groupMembers: [],

        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };


    getGroup();
    //publishData();
  
    setDate(null);
    setTime('');
    setPickupLocation('');
  };
  

  return (
    <body className='bookpage'>
      <section className="booking-container">
      <TopBar/>
      <div className='book-form'>
    <form>
      <label>
        Date:
        <DateInput selectedDate={selectedDate} handleDateChange={(date) => setDate(date)} />
      </label>
      <br />
      <label>
        Time:
        <TimeInput selectedTime={selectedTime} handleTimeChange={(e) => setTime(e.target.value)} />
      </label>
      <br />
      <label>
        Pickup Location:
        <PickupSpotInput
          selectedPickupSpot={selectedPickupLocation}
          handlePickupSpotChange={(e) => setPickupLocation(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" onClick={(handleSubmit)}>Submit</button>
    </form>
    </div>
    </section>
    </body>
  );
};

export default BookRide;
