import { useState, useEffect,useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5005/api";


function OrderPage() {

    const navigate = useNavigate();
    const { user,isAdmin} = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");
    
    const storedTimeSlot = localStorage.getItem(`timeslot_${user._id}`);
    const appointmentTime = storedTimeSlot ? JSON.parse(storedTimeSlot) : undefined;
  
    const storedDate = localStorage.getItem(`date_${user._id}`);
    const appointmentDate = storedDate ? JSON.parse(storedDate) : undefined;

    const storedOrderItems = localStorage.getItem(`orderItems_${user._id}`);
    const orderItems = storedOrderItems ? JSON.parse(storedOrderItems) : [];


    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [unavailable, setUnavailable] = useState([])


  const handleSelect = (date, timeSlot) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  function handleStoringBooking(date, timeSlot) {
    localStorage.setItem(`timeslot_${user._id}`, JSON.stringify(timeSlot));
    localStorage.setItem(`date_${user._id}`, JSON.stringify(date));
    
  }

  useEffect(() => {
    console.log("Selected date and time slot changed:", selectedDate, selectedTimeSlot);
  }, [selectedDate, selectedTimeSlot]);


  const storeUnavailableAppointment = () => {
    const requestBody = { selectedDate,selectedTimeSlot};

    axios.post(`${API_URL}/appointment`, requestBody)
    .then((response) => {
        console.log("added to unavailable:")
    })
};

const storeBooking = () => {
  
  const requestBody = { orderItems, selectedDate,selectedTimeSlot, userId: user._id };
  axios.post(`${API_URL}/booking`, requestBody).then(() => {});
  navigate('/mybooking')
};


const getUnavailable = () => {
  axios
    .get(`${API_URL}/appointment`,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    
    .then((response) => {
      console.log("Unavailable appointments:" ,  response.data)
      setUnavailable(response.data)})
    .catch((error) => console.log(error));
};

useEffect(() => {
  getUnavailable();
}, [] );



// console.log("PATAAAAA", unavailable[0])
//  console.log("CHEEEEEEEE", unavailable[0].unavailable[0].selectedDate.slice(0,10))
// console.log("EL TURNOOO ESSSSS: ",selectedDate,selectedTimeSlot)


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
        <div className="Appointment">
          
          {unavailable.length > 0 && (

      <div>
        {!isAdmin && (
              <>
              <div className="selected-time">

            <div>
            {appointmentDate && appointmentTime ? (
              <p>Date: {appointmentDate.slice(5,10)} <br/> Time: {appointmentTime}</p>
                ) : <p>Selecting date</p>
            }
            </div>

            <div>
            {orderItems.length === 0 && (
                <div>No items </div>
            ) }

            <div>
                {orderItems.map((item)=>(
                    <div key={item._id}>
                        <p> Service: {item.name} <br/> Price: {item.price}</p>
                        
                    </div>
                ))}
            </div>
            </div>
            
            <div>
            <button onClick={() => {storeUnavailableAppointment(appointmentDate, appointmentTime);
                storeBooking(orderItems, selectedDate,selectedTimeSlot)}}>Confirm Appointment</button>
            </div>

            </div>
            </>
            )}

{isAdmin && (
              <>
              <div className="selected-time">
            <h1>Set unavailabilies</h1>

            
            {appointmentDate && appointmentTime ? (
              <h3>Time-slot on {appointmentDate.slice(5,10)} at {appointmentTime}</h3>
                ) : <h3>Selecting date</h3>
            }

            <button className="button-red" onClick={() => {storeUnavailableAppointment(appointmentDate, appointmentTime)}}>Set unavailable</button>
            
            </div>
            </>
            )}
            




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
                  
                  unavailable[0].unavailable.some(object =>
                 object.selectedDate.slice(0,10) === date.toISOString().slice(0,10) && object.selectedTimeSlot === timeSlot
                )
                     ? "selected"
                     : ""
                }`}
                 onClick={() => {handleSelect(date, timeSlot);handleStoringBooking(date, timeSlot)}}
              >
                {timeSlot}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>



          </div>
           )} 
        </div>
    );
}

export default OrderPage;


