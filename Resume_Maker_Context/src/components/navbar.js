import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  console.log(isAuthenticated);
  const handleLogout = () => {};
  return (
    <>
      <nav className="navbar">
        {isAuthenticated && (
          <div className="">
            <NavLink to="/" activeclassname="active-link">
              Details
            </NavLink>
            <NavLink to="/resume" activeclassname="active-link">
              Resume
            </NavLink>
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </span>
          </div>
        )}
        <button className="navbar-toggler">☰</button>
        {!isAuthenticated && (
          <div>
            <NavLink to="/signin" activeclassname="active-link">
              Sign In
            </NavLink>
            <NavLink to="/signup" activeclassname="active-link">
              Sign Up
            </NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
