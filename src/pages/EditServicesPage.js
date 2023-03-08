import { useState,useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
    
const API_URL = "http://localhost:5005";
    
function EditServicesPAge({services}) {
        const [name, setName] = useState("");
        const [price, setPrice] = useState(0);
        const [description, setDescription] = useState("");

        const [errorMessage, setErrorMessage] = useState(undefined);
        
        const navigate = useNavigate();

        const { serviceId } = useParams();

        const storedToken = localStorage.getItem("authToken");


        useEffect(() => {
            axios
              .get(
                `${API_URL}/api/editservices/${serviceId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
              )

                // GET /api/editservices/:id
      
        
            
              .then((response) => {
                const oneService = response.data;
                setName(oneService.name);
                setDescription(oneService.description);
              })
              .catch((error) => console.log(error));
            
          }, [serviceId]);



const handleEditSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, description, price };

    axios
      .put(
        `${API_URL}/api/editservices/${serviceId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
     
      .then((response) => {
        navigate(`/services`)
      });
  };


  const deleteService = () => {

    axios
      .delete(
        `${API_URL}/api/services/${serviceId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )       
      .then(() => navigate("/services"))
      .catch((err) => console.log(err));
  };  



    return ( 
        <div className="EditService">
            <h1>Edit service</h1>
        
            <form onSubmit={handleEditSubmit}>
                <label>Name:</label>
                <input 
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
        

                <label>Price:</label>
                <input 
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
        
        

                <label>Description:</label>
                <input 
                type="text"
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
        
                <button type="submit">Edit</button>
                <button onClick={deleteService}>Delete Service</button>
            </form>
        
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        
            
            </div>
     );
}

export default EditServicesPAge;