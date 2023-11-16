import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("id");
    dispatch(authenticate.logout());
    navigate("/signin");
  };
  useEffect(() => {}, [isAuthenticated]);
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
            <button className="navbar-toggler">☰</button>
          </div>
        )}
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
