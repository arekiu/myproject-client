import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
    
    const API_URL = process.env.REACT_APP_API_URL
    
    
    function CreateService(props) {
        const [name, setName] = useState("");
        const [price, setPrice] = useState(0);
        const [description, setDescription] = useState("");
        const [image, setImage] = useState("")

        const [errorMessage, setErrorMessage] = useState(undefined);
        
        const navigate = useNavigate();
        
        const handleName = (e) => setName(e.target.value);
        const handlePrice = (e) => setPrice(e.target.value);
        const handleDescription = (e) => setDescription(e.target.value);

        const handleFileUpload = (e) => {
            const uploadData = new FormData();
         
            // imageUrl => this name has to be the same as in the model since we pass
            // req.body to .create() method when creating a new movie in '/api/movies' POST route
            uploadData.append("image", e.target.files[0]);
         
            axios.post("http://localhost:5005/api/upload", uploadData)
              .then(response => {
                // console.log("response is: ", response);
                // response carries "fileUrl" which we can use to update the state
                setImage(response.data.image);
              })
              .catch(err => console.log("Error while uploading the file: ", err));
          };
        
        
        const handleCreateServiceSubmit = (e) => {
            e.preventDefault();
            // Create an object representing the request body
            const requestBody = { name, price, description,image };
        
            // Make an axios request to the API
            // If the POST request is a successful redirect to the login page
            // If the request resolves with an error, set the error message in the state
            axios.post(`${API_URL}/api/services`, requestBody)
            .then((response) => {
                props.getAllServices()
                navigate('/services');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
        };
        
        
        return (
            <div className="CreateService">
            <h1>Create or Edit service</h1>
        
            <form onSubmit={handleCreateServiceSubmit}>
                <label>Name:</label>
                <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                />
        
        <label>Image:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />

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