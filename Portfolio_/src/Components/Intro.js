import React from "react";
import "./Intro.css";

function Intro() {
  return (
    <div className="contact">
      <div className="intro-left">
        <div className="i-name">
          <span>Hi,</span>
          <span>I am Abhishek Pradhan</span>
          <span>
            Aspiring Software Developer with expertise in Web Development, DSA,
            Data Science, & Cloud Deployment. Ranked number 1 in BTech CSE, have
            a strong academic background in Computer Science and Engineering
            (CSE). Detail-oriented, responsible, and have a proven track record
            of delivering high-quality software products on time. Passionate
            about solving complex problems and collaborating with
            cross-functional teams to develop innovative solutions.
          </span>
        </div>
        <div className="i-icons">
          <a
            href="https://www.linkedin.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <button className="button i-button">Hire Me</button>
      </div>
      <div className="i-image">
        <img
          src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg"
          alt="My_image"
        />
      </div>
    </div>
  );
}

export default Intro;
