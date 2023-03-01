import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const API_URL = "http://localhost:5005/api";
 
 
function Services() {
  const [services, setServices] = useState([]);
 
  const getAllServices = () => {
    axios
      .get(`${API_URL}/products`)
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllServices();
  }, [] );
 
  
  return (
    <div className="Services">
      
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