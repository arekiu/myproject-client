import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateService from "../components/CreateService";
 
const API_URL = "http://localhost:5005/api";
 
 
function Services() {
  const [services, setServices] = useState([]);
 
  const getAllServices = () => {
    axios
      .get(`${API_URL}/services`)
      
      .then((response) => {
        console.log("LOS SERVICIOS SON:" ,  response.data)
        setServices(response.data)})
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllServices();
  }, [] );


  // const handleOrder = (e) => {
  //   e.preventDefault();
  //   const requestBody = { total, user_id: user[0]._id, order_items, date };
  //   console.log("este es el id del deck", user[0]._id);
  //   axios.post(`${API_URL}/orders`, requestBody).then((response) => {
  //     console.log(response.data);
  //   });
    
  // };
 
  
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
                {/* <button onChange={handleOrder}>Add</button> */}
                </div>

                </div>
              
            </div>
          );
        })}     
      
    </div>
  );
}
 
export default Services;