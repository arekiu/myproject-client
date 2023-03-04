import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route,Link, Router } from "react-router-dom";
import CreateService from "../components/CreateService";

 
const API_URL = "http://localhost:5005/api";
 
 
function Services({services, getAllServices,handleAddItem,orderItems,handleRemoveItem}) {
 
  
  return (

    <div className="Services">


    <CreateService getAllServices={getAllServices} />
      
        {services.map((service) => {
          return (
            <div  className="service-card" key={service._id} >
              
              <div className="card">

              <div className="card-head">
              <img src={service.image} alt="haircut"/> 
                <h3>{service.name}</h3>
                </div>

                <div className="card-body">
                <p>{service.description}</p>
                <h4>{service.price}</h4>

                <button onClick={() =>handleAddItem(service)}>Add</button>
                <button onClick={() =>handleRemoveItem(service)}>Remove</button>
        
                </div>

                </div>
               
            </div>
            
          );
        })}     
       <Link to="/order" state={{ orderItems }}>Go to Order Page</Link>
    </div>
  );
}
 
export default Services;