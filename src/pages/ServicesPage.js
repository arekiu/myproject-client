import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateService from "../components/CreateService";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api";

function Services({services, getAllServices, handleAddItem, orderItems, handleRemoveItem}) {
  const { user, isAdmin } = useContext(AuthContext);

  function handleGoToOrderPage() {
    localStorage.setItem(`orderItems_${user._id}`, JSON.stringify(orderItems));
  }


  const [selectedServices, setSelectedServices] = useState([]);

  function handleServiceSelection(service) {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
      handleRemoveItem(service);
    } else {
      setSelectedServices([...selectedServices, service]);
      handleAddItem(service);
    }
  }


  return (
    <div className="Services">

                  {isAdmin && (
                    <Link className="links" to="/order" onClick={handleGoToOrderPage}>
                    Edit Calendar
                  </Link>
                  )}

      {!isAdmin && (            
      <h2>Select your service and then <br/> book your time slot <Link className="links" to="/order" onClick={handleGoToOrderPage}>
          HERE
      </Link></h2>
      )}
      <div className="createservice-container">
        {isAdmin && <CreateService getAllServices={getAllServices} />}
      </div>

      <div className="services-container">
        {services?.map((service, index) => {
          const isSelected = selectedServices.includes(service);
          return (
            <div className="service-card" key={service._id}>
              <div className={`card ${isSelected ? "buttonselected" : ""}`}>
                <div className="card-head">
                  <div className="card-image-container">
                    <img src={service.image} alt="haircut" />
                  </div>
                  <h3>{service.name}</h3>
                </div>

                <div className="card-body">
                  <p>{service.description}</p>
                  <h4>{service.price}€</h4>

                  {isAdmin && (
                    <Link to={`/editservices/${service._id}`}>
                      <button>Edit</button>
                    </Link>
                  )}

                  {!isAdmin && (
                    <div>
                      <button className={`card-button ${isSelected ? "buttonselected" : ""}`} onClick={() => handleServiceSelection(service)}>
                    {isSelected ? "Remove" : "Add"}
                  </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default Services;