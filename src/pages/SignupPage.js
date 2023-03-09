import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ScissorImage from "../images/scissor.png"
    
    const API_URL = process.env.REACT_APP_API_URL
    
    
    function SignupPage(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [name, setName] = useState("");
        const [phoneNumber, setPhoneNumber] = useState("");
        const [errorMessage, setErrorMessage] = useState(undefined);
        
        const navigate = useNavigate();
        
        const handleEmail = (e) => setEmail(e.target.value);
        const handlePassword = (e) => setPassword(e.target.value);
        const handleName = (e) => setName(e.target.value);
        const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
        
        
        const handleSignupSubmit = (e) => {
            e.preventDefault();
            // Create an object representing the request body
            const requestBody = { email, password, name };
        
            // Make an axios request to the API
            // If the POST request is a successful redirect to the login page
            // If the request resolves with an error, set the error message in the state
            axios.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
        };
        
        
        return (
            <div className="SignupPage">
        
            <div className="signup-content">
            <div className="div-form">
            <form className="sign-form" onSubmit={handleSignupSubmit}>

                <div className="form-element">
                <label>Name:</label>
                <input type="text" name="name" value={name} onChange={handleName}/>
                </div>
                
                <div className="form-element">
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail}/>
                </div>

                <div className="form-element">
                <label>Phone number:</label>
                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumber}/>
                </div>

                <div className="form-element">
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword}/>
                </div>
                <button className="button-form" type="submit">Sign up</button>
            </form>
        
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        
            <p>Already have account?</p>
            <Link className="links" to={"/login"}> Log in</Link>
            
            </div>

            <div className="div-image">
            <img src={ScissorImage} alt="scissors"/>   
            </div> 

            </div>
            </div>
        )
    }
    
export default SignupPage;