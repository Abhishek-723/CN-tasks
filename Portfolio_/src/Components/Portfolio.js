import React, { useEffect } from "react";
import Swiper from "swiper";
// import "swiper/swiper-bundle.css";
import "./Portfolio.css";

const Portfolio = () => {
  useEffect(() => {
    new Swiper(".portfolio-slider", {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <div className="project-section">
      {/* <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div> */}
      <div className="portfolio-slider">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="project-card">
              <img src="project-img-1.jpg" alt="img-1" />
              <p>Description of Project 1</p>
              <a
                href="https://github.com/yourusername/project1"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="project-card">
              <img src="project-img-2.jpg" alt="img-2" />
              <p>Description of Project 2</p>
              <a
                href="https://github.com/yourusername/project2"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="project-card">
              <img src="project-img-3.jpg" alt="img-3" />
              <p>Description of Project 3</p>
              <a
                href="https://github.com/yourusername/project3"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="project-card">
              <img src="project-img-4.jpg" alt="img-4" />
              <p>Description of Project 4</p>
              <a
                href="https://github.com/yourusername/project4"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
