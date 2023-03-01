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
 
  
  return (



    <div className="Services">

    <CreateService/>
      
        {services.map((service) => {
          return (
            <div  key={service._id} >
              <Link to={`/services/${service._id}`}>
                <h3>{service.name}</h3>
              </Link>
            </div>
          );
        })}     
       
    </div>
  );
}
 
export default Services;