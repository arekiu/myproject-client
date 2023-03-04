import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "http://localhost:5005/api";


function OrderPage() {
    const location = useLocation();
  const orderItems = location.state.orderItems;
    
    const storedToken = localStorage.getItem("authToken");
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