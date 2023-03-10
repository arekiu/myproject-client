import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Compass from "../images/compass.png"
import { useNavigate } from "react-router-dom";

function MyBooking() {

    const { user,isAdmin} = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");
    
    const storedTimeSlot = localStorage.getItem(`timeslot_${user._id}`);
    const appointmentTime = storedTimeSlot ? JSON.parse(storedTimeSlot) : undefined;
  
    const storedDate = localStorage.getItem(`date_${user._id}`);
    const appointmentDate = storedDate ? JSON.parse(storedDate) : undefined;

    const storedOrderItems = localStorage.getItem(`orderItems_${user._id}`);
    const orderItems = storedOrderItems ? JSON.parse(storedOrderItems) : [];



    return ( 
        <div>
            <h3>Here you can see your appointments</h3>
            <div><img src={Compass} alt="compass" /></div>
            <div className="cajita">
                <div></div>
                <div></div>
            </div>
            <h3>Don´t forget to bring cash!</h3>
        </div>
     );
}

export default MyBooking;