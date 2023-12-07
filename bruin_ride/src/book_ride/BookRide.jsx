import React, { useState, useCallback, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from '../main_page/components/Topbar/Topbar';
import './bookride.css';
import { db, auth } from '../login/SignInOut';
import { addDoc, collection } from 'firebase/firestore';
import map from '../images/map.svg';
import { AuthContext } from '../context/context';
import { useContext } from 'react';
import '../MainPage.css';

const DateInput = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="MM-dd-yyyy" placeholderText="Select date" />
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
  const pickupSpots = ['De Neve', 'Carnesale Commons', 'Rieber Terrace', 'Hedrick/Hitch', 'Gayley Avenue'];

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
  const { TripAdded, isTripAdded } = useContext(AuthContext);
  const [selectedDate, setDate] = useState(null);
  const [selectedTime, setTime] = useState('');
  const [selectedPickupLocation, setPickupLocation] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime || !selectedPickupLocation) {
      alert('Please fill in all fields');
      return;
    }

    if (localStorage.getItem('userSign') === 'false') {
      alert('Please sign in to book a ride.');
      window.location.href = '/login';
    }

    const combinedDateTime = new Date(selectedDate.toISOString().split('T')[0] + 'T' + selectedTime);

    const currentDate = new Date();

    if (currentDate > combinedDateTime) {
      alert('Cannot book a ride for a past date and time. Please choose a future date and time.');
      return;
    }

    const iso8601String = combinedDateTime.toISOString();

    const getGroup = async () => {
      const user = auth.currentUser;
      const name = user ? user.displayName : 'Default Name';
      if (user) {
        try {
          const uid = auth.currentUser.uid;
          console.log(uid);
          const cloudFunctionURL = `https://us-central1-bruinride-41c8c.cloudfunctions.net/algo/allow-cors?database=${db}&dateTime=${iso8601String}&location=${selectedPickupLocation}&uid=${uid}&name=${name}`;

          const response = await fetch(cloudFunctionURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            isTripAdded(true);
            setBookingMessage('Your ride has been booked!');
          }

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          alert(error);
        }
      } else {
        console.log('user not logged in');
      }
    };
    setDate(null);
    setTime('');
    setPickupLocation('');
    getGroup();
  }, [selectedDate, selectedTime, selectedPickupLocation]);

  useEffect(() => {
    if (!TripAdded) {
      handleSubmit();
    } else if (TripAdded) {
      isTripAdded(false);
    }
  }, [TripAdded]);

  return (
    <div className="app">
      <div className="background-circles"></div>
      <header className="navbar">
        {' '}
        <TopBar />{' '}
      </header>
      <main className="bookpage">
        <p className="header">Plan your next trip to LAX</p>
        <div className="bookform">
          <div className="map">
            <iframe
              src="https://storage.googleapis.com/maps-solutions-6o7tjf0tor/locator-plus/tyje/locator-plus.html"
              width="100%"
              height="100%" // Set your desired height here
              style={{
                border: '5px solid #C6FBB9',
                boxShadow: '0 0 50px rgba(198, 251, 185, 0.4)',
                borderRadius: '5px',
              }}
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
          <div className="booking-container">
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
              <button className="submit-button" type="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            </form>
            {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookRide;

