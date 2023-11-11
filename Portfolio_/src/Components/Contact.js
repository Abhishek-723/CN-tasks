import React from "react";
import "./Contact.css";

function ContactSection() {
  return (
    <div className="contact-form">
      <div className="w-left">
        {/* Left content, for example, dark mode switch */}
      </div>
      <div className="awesome">
        <div className="c-right">
          <form>
            <div className="user_name">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="user_email">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="user_message">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
