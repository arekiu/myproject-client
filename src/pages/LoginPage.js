import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Scissor2Image from "../images/scissors2.png"
    
    const API_URL = "http://localhost:5005";
    
    
    function LoginPage(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [errorMessage, setErrorMessage] = useState(undefined);
        
        const navigate = useNavigate();

        const { storeToken, authenticateUser } = useContext(AuthContext);
        
        const handleEmail = (e) => setEmail(e.target.value);
        const handlePassword = (e) => setPassword(e.target.value);
        
        
        const handleLoginSubmit = (e) => {
            e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
        .then((response) => {
            // Request to the server's endpoint `/auth/login` returns a response
            // with the JWT string ->  response.data.authToken
            console.log('JWT token', response.data.authToken );

            storeToken(response.data.authToken);
        
        authenticateUser();
        navigate('/');                                
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    };
        
        return (
            <div className="LoginPage">
            <h1>Log in</h1>

            <div className="signup-content">
            
            <div className="div-form div-form-login">
            <form className="sign-form" onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail}/>
        
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword}/>
        
                <button className="button-form" type="submit">Login</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        
            <p>Don't have an account yet?</p>
            <Link className="links" to={"/signup"}> Sign Up</Link>
            </div>

            <div className="div-image">
            <img src={Scissor2Image} alt="scissors"/>   
            </div> 

            </div>
            </div>
        )
    }
    
export default LoginPage;