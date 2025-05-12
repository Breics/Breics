import React from "react";
import "../styles/BreicsSuitable.css";
import stud from "../image/stud.png";
import A from '../image/A.png'
const audience = [
  {
    title: "FOR STUDENTS",
    image: "https://via.placeholder.com/300x200?text=Students",
    description:
      "We understand how students need to get comfortable on a budget, at Breics we provide rooms that are conducive, budget friendly and at the same time close to your school.",
  },
  {
    title: "FOR THE WORKING CLASS",
    image: "https://via.placeholder.com/300x200?text=Working+Class",
    description:
      "Find convenient spaces, rooms and homes close to work that helps you live smartly and efficiently. Choose what suits you or your organisation on Breics.",
  },
  {
    title: "FOR PEOPLE ON A BUDGET",
    image: "https://via.placeholder.com/300x200?text=Budget",
    description:
      "At Breics we help you find and pay for rooms with flexible payment options to suit your budget.",
  },
];

const BreicsSuitable = () => {
  return (
    <div className="suitable-section">
      <h5>WE HAVE JUST THE RIGHT PROPERTIES FOR ANY GROUP OF PEOPLE</h5>
      <h2>Breics is Suitable</h2>

      <div className="audience-grid">
        {audience.map((item, index) => (
          <div className="audience-card" key={index}>
            <img src={stud} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* New Responsive Side-by-Side Divs */}
      <div className="responsive-pair">
        <div className="responsive-box">
          <img
            src={A}
            alt="Card 1"
            className="card-icon"
          />
          <h3>Looking for a home</h3>
          <p>
            Find the right home and property for you in the shortest time.
            choose quality and Convienence here on Breics
          </p>
          <button className="btn"> Find Properties</button>
        </div>
        <div className="responsive-box">
          <img
            src={A}
            alt="Card 2"
            className="card-icon"
          />
          <h3>Looking for a home</h3>
          <p>
            Find the right home and property for you in the shortest time.
            choose quality and Convienence here on Breics
          </p>
          <button className="btn"> Find Properties</button>
        </div>
      </div>
    </div>
  );
};

export default BreicsSuitable;
