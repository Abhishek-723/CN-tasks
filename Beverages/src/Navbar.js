import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo"> Beverages</div>
      <div className="nav-elements">
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/About">
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
