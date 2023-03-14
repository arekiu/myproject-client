import { NavLink,Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";
import divider from "../images/divider.png"
 
function Navbar() {

    const { isLoggedIn, isAdmin, logOutUser } = useContext(AuthContext);

    return (
      <div className="nav-component">

          <nav>
            <NavLink className="nav-link" to="/">Home</NavLink>

            {!isAdmin && (
            <>
            <NavLink className="nav-link" to="/aboutus">About us</NavLink>

            <NavLink className="nav-link" to="/services">Book</NavLink>  
            </>
            )}

            {isAdmin && (
              <NavLink className="nav-link" to="/services">Edit </NavLink>  
            )}

            {isLoggedIn && (
              <>

                <Link className="nav-link" to="/" onClick={logOutUser}>Log out</Link>


                {/* <span>{user.name}</span> */}
              </>
            )}

            {!isLoggedIn && (
              <>
                <NavLink className="nav-link" to="/signup"> Sign up </NavLink>
                <NavLink className="nav-link" to="/login"> Log in </NavLink>
              </>
            )}
          </nav>

            <img className="divider" src={divider} alt="" />

        </div>
      );
    }
 
export default Navbar;