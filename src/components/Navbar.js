import { Link } from "react-router-dom";
 
function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
 
      <Link to="/products">
        <button>Products</button>
      </Link>
    </nav>
  );
}
 
export default Navbar;