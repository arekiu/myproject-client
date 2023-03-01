import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT
 
import Navbar from "./components/Navbar";     
import HomePage from "./pages/HomePage";     
import Services from "./pages/Services";
 
function App() {
  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/products" element={ <Services /> } />
      </Routes>
      
    </div>
  );
}
 
export default App;