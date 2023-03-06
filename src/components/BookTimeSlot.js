import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function BookTimeSlot() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const { user} = useContext(AuthContext);

  const handleSelect = (date, timeSlot) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  function handleStoringBooking() {
    localStorage.setItem(`timeslot_${user._id}`, JSON.stringify(selectedTimeSlot));
    localStorage.setItem(`date_${user._id}`, JSON.stringify(selectedDate));
  }

  const storedTimeSlot = localStorage.getItem(`timeslot_${user._id}`);
  const appointmentTime = storedTimeSlot ? JSON.parse(storedTimeSlot) : [];


  const storedDate = localStorage.getItem(`date_${user._id}`);
  const appointmentDate = storedDate ? JSON.parse(storedDate) : [];


console.log("EL TURNOOO ESSSSS: ",selectedDate,selectedTimeSlot)
  const timeSlots = [
    "9:00am - 10:00am",
    "10:00am - 11:00am",
    "11:00am - 12:00pm",
    "1:00pm - 2:00pm",
    "2:00pm - 3:00pm",
    "3:00pm - 4:00pm",
  ];

  const days = [];
  for (let i = 0; i < 28; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const day = date.toLocaleString("default", { weekday: "short" });
    const month = date.toLocaleString("default", { month: "short" });
    const number = date.getDate();
    days.push({ date, day, month, number });
  }

  return (
    <div className="calendar">
      {days.map(({ date, day, month, number }) => (
        <div key={date} className="date">
          <div className="header">
            <div className="header-month">
            <div className="month">{month}</div>
            </div>
            <div className="header-day">
            <div className="day">{day}</div>
            <div className="number">{number}</div>
            </div>
          </div>
          <div className="time-slots">
            {timeSlots.map((timeSlot) => (
              <div
                key={timeSlot}
                className={`time-slot ${
                  selectedDate === date && selectedTimeSlot === timeSlot
                    ? "selected"
                    : ""
                }`}
                onClick={() => {handleSelect(date, timeSlot);handleStoringBooking()}}
              >
                {timeSlot}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookTimeSlot