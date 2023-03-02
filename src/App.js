import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT
 
import Navbar from "./components/Navbar";     
import HomePage from "./pages/HomePage";     
import Services from "./pages/ServicesPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateService from "./components/CreateService"; 
 
function App() {
  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/services" element={ <Services />} />
        <Route path="/login" element={ <LoginPage /> } />
      
      </Routes>
      
    </div>
  );
}
 
export default App;