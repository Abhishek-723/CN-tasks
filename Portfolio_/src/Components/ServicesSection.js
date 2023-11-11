import React from "react";
import "./Services.css";

function ServicesSection() {
  return (
    <div className="services" id="services">
      <div className="awesome">
        <h1>Services and Domains</h1>
        <p>
          I'm skilled in app, web, and content writing skills and have
          experience in the same.
        </p>
      </div>
      <div className="cards">
        <div className="card">
          <img
            src="https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2021_12_Programming-vs-Web-Development.jpg"
            alt="Web Development"
          />
          <h2>Web Development</h2>
          <p>Design and develop responsive and user-friendly websites.</p>
        </div>
        <div className="card">
          <img
            src="https://assets-global.website-files.com/6410ebf8e483b5bb2c86eb27/6410ebf8e483b5758186fbd8_ABM%20college%20mobile%20app%20dev%20main.jpg"
            alt="App Development"
          />
          <h2>App Development</h2>
          <p>Create mobile applications for various platforms and devices.</p>
        </div>
        <div className="card">
          <img
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/How_To_Become_A_Content_Writer.jpg"
            alt="Content Writing"
          />
          <h2>Content Writing</h2>
          <p>
            Produce high-quality content for websites, blogs, and marketing
            materials.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
