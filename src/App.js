import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT
import { useState, useEffect } from "react"; 
import axios from "axios";
import Navbar from "./components/Navbar";     
import HomePage from "./pages/HomePage";     
import Services from "./pages/ServicesPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import OrderPage from "./pages/OrderPage";
import EditServicesPage from "./pages/EditServicesPage"
import AboutUsPage from "./pages/AboutUsPage"


const API_URL = process.env.REACT_APP_API_URL;

 
function App() {
  let [services, setServices] = useState([]);
  const [orderItems,setOrderItems] = useState([])

  const storedToken = localStorage.getItem("authToken");
 
  const getAllServices = () => {
    axios
      .get(`${API_URL}/services`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      
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

  const handleAddItem = (item)=>{
    console.log("Adding item", item);
    setOrderItems([...orderItems, { ...item }]);
};

const handleRemoveItem = (item) => {
  const updatedItems = orderItems.filter((i) => i.id !== item.id);
  setOrderItems(updatedItems);
};


  useEffect(() => {
    console.log("LOSSS ITEMSSSS",orderItems);
  }, [orderItems]);



  
  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/aboutus" element={<AboutUsPage/>}/>
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/services" element={  <IsPrivate><Services services={services} 
        getAllServices={getAllServices} handleAddItem={handleAddItem} 
        handleRemoveItem={handleRemoveItem} orderItems={orderItems}/> </IsPrivate>} />
        <Route path="/order" element={<IsPrivate> <OrderPage orderItems={orderItems} /> </IsPrivate>}/> 
        <Route path="editservices/:serviceId" element={<EditServicesPage  services={services}/> }/>
        
      
      </Routes>

      
      
    </div>
  );
}
 
export default App;