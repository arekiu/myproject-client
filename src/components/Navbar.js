import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";
import divider from "../images/divider.png"
 
function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
      <div className="nav-component">

          <nav>
            <Link className="nav-link" to="/">Home</Link>

            <Link className="nav-link" to="/">About us</Link>

            {isLoggedIn && (
              <>
                <Link className="nav-link" to="/services">Book</Link>  

                <Link className="nav-link" onClick={logOutUser}>Logout</Link>


                {/* <span>{user.name}</span> */}
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link className="nav-link" to="/signup"> Sign Up </Link>
                <Link className="nav-link" to="/login"> Login </Link>
              </>
            )}
          </nav>

            <img className="divider" src={divider} alt="" />

        </div>
      );
    }
 
export default Navbar;