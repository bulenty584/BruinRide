
import React, { useState } from 'react';

const BookRide = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Date: ${date}, Time: ${time}, Pickup Location: ${pickupLocation}`);
    //send information to the backend
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeSlot);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <br />
      <label>
        Time:
        <select value={time} onChange={handleTimeChange}>
          <option value="">Select a time slot</option>
          {timeSlots.map((timeSlot) => (
            <option key={timeSlot} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Pickup Location:
        <select value={pickupLocation} onChange={handlePickupLocationChange}>
          <option value="">Select a pickup location</option>
          <option value="De Neve">De Neve</option>
          <option value="Rieber Terrace">Rieber Terrace</option>
          <option value="Carnesale Commons">Carnesale Commons</option>
          <option value="Holly/Gayley">Holly/Gayley</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookRide;
