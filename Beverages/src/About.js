import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-section">
        <h1>About</h1>
        <p className="about-text" style={{ fontSize: "22px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          repudiandae architecto qui adipisci in officiis, aperiam sequi atque
          perferendis eos, autem maiores nisi saepe quisquam hic odio
          consectetur nobis veritatis quasi explicabo obcaecati doloremque?
          Placeat ratione hic aspernatur error blanditiis?
        </p>
      </div>
    </div>
  );
};

export default About;
