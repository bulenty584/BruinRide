import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from '../main_page/components/Topbar/Topbar';
import './bookride.css';
import {db, auth} from "../login/SignInOut"
import { ref, set } from "firebase/database";

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
    console.log(`Date: ${selectedDate}, Time: ${selectedTime}, Pickup Location: ${selectedPickupLocation}`);
    const publishData = (userId) => {
      try{
        set(ref(db, 'users/' + userId), {
          date: selectedDate,
          time: selectedTime,
          pickupLocation: selectedPickupLocation
        });
      } catch (error) {
        console.error('Error during button click:', error);
      }
      
    }

    publishData(auth.currentUser.uid)

    setDate(null);
    setTime('');
    setPickupLocation('');

  };

  return (
    <body className='bookpage'>
      <section className="booking-container">
      <TopBar/>
      <div className='book-form'>
    <form onSubmit={handleSubmit}>
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
