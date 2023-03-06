import { useState, useEffect,useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api";


function OrderPage() {
    const location = useLocation();
//   const orderItems = location.state.orderItems;
const { user} = useContext(AuthContext);

console.log("ESTEEEEE ES USEERRRRR:", user)

  const storedOrderItems = localStorage.getItem(`orderItems_${user._id}`);
  const orderItems = storedOrderItems ? JSON.parse(storedOrderItems) : [];


    console.log(orderItems)




    return ( 
        <div>
            <h1>carrito</h1>

            {orderItems.length === 0 && (
                <div>No items </div>
            ) }


            <div>
                {orderItems.map((item)=>(
                    <div key={item._id}>
                        <h3>{item.name}</h3>
                        <p>Price: {item.price}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}

export default OrderPage;