import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
    
    const API_URL = "http://localhost:5005";
    
    
    function CreateService(props) {
        const [name, setName] = useState("");
        const [price, setPrice] = useState(0);
        const [description, setDescription] = useState("");

        const [errorMessage, setErrorMessage] = useState(undefined);
        
        const navigate = useNavigate();
        
        const handleName = (e) => setName(e.target.value);
        const handlePrice = (e) => setPrice(e.target.value);
        const handleDescription = (e) => setDescription(e.target.value);
        
        
        const handleCreateServiceSubmit = (e) => {
            e.preventDefault();
            // Create an object representing the request body
            const requestBody = { name, price, description };
        
            // Make an axios request to the API
            // If the POST request is a successful redirect to the login page
            // If the request resolves with an error, set the error message in the state
            axios.post(`${API_URL}/api/services`, requestBody)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
        };
        
        
        return (
            <div className="CreateService">
            <h1>Create service</h1>
        
            <form onSubmit={handleCreateServiceSubmit}>
                <label>Name:</label>
                <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                />
        
                <label>Price:</label>
                <input 
                type="number"
                name="price"
                value={price}
                onChange={handlePrice}
                />
        
        

                <label>Description:</label>
                <input 
                type="text"
                name="Description"
                value={description}
                onChange={handleDescription}
                />
        
                <button type="submit">Create</button>
            </form>
        
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        
            
            </div>
        )
    }
    
export default CreateService;