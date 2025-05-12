import React from "react";
import "../styles/SuscribeSection.css";

const SubscribeSection = () => {
  return (
    <div className="subscribe-section">
      <div className="subscribe-content">
        <div className="subscribe-text">
          <h2>Be the First to Know</h2>
          <p>
            Get Notified about Breics’ newsletter & Marketing Communication. <br />
            We promise not to spam you.
          </p>
        </div>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeSection;
