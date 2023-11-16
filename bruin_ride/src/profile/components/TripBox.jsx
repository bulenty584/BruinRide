import TopBar from "../../main_page/components/Topbar/Topbar";

const TripBox = ({ pickupPoint, dateTime, status }) => {
  // Assuming dateTime is a string representation of a date and time (ISO 8601 formatted strings)
  const parsedDateTime = new Date(dateTime);

  // Extracting date and time components
  const date = parsedDateTime.toLocaleDateString();
  const time = parsedDateTime.toLocaleTimeString();

  return (
    <div className="trip-box">
      <h2>{pickupPoint} to LAX</h2>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default TripBox;
