import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="f-content">
      <span>abhishekpradhan@codingninjas.com</span>
      <div className="f-icons">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
