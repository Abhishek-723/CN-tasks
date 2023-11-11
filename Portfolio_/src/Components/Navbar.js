import React from "react";
import "./Navbar.css";

const Navbar = () => {
  function toggleNavList() {
    var navList = document.querySelector(".n-list");
    navList.classList.toggle("active");
  }
  return (
    <div class="n-wrapper" id="Navbar">
      <div class="n-left">
        <div class="n-name">ABHISHEK</div>
      </div>
      <div class="n-right">
        <div class="n-hamburger" onClick={toggleNavList}>
          <i class="fas fa-bars"></i>
        </div>
        <div class="n-list">
          <ul>
            <li>
              <a href="#home">
                <i class="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a href="#domains">
                <i class="fas fa-globe"></i> Domains
              </a>
            </li>
            <li>
              <a href="#experience">
                <i class="fas fa-briefcase"></i> Experience
              </a>
            </li>
            <li>
              <a href="#portfolio">
                <i class="fas fa-folder"></i> Portfolio
              </a>
            </li>
            <li>
              <a href="#contact">
                <i class="fas fa-envelope"></i> Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
