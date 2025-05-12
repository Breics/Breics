import React, { useState } from "react";
import "../styles/Slider.css";
import slid from "../image/slid.png"

const slides = [
  {
    title: "Find Leases on any Budget",
    description:
      "Save cost on relocating. Find convenient properties and rentals suitable for your lifestyle",
    icon: "🏡",
    image: {slid},
  },
  {
    title: "Discover Prime Locations",
    description:
      "Get access to properties in high-demand neighborhoods with great amenities.",
    icon: "📍",
    image: {slid},
  },
  {
    title: "Secure and Easy Payments",
    description:
      "Enjoy peace of mind with secure transactions and flexible payment options.",
    icon: "💳",
    image: {slid},
  },
  {
    title: "Move-in Ready Homes",
    description:
      "Browse listings of fully furnished and ready-to-occupy homes.",
    icon: "📦",
    image: {slid},
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider">
      <button className="arrow left" onClick={goToPrevious}>
        &#8592;
      </button>

      <div className="slide-content">
        <div className="text">
          <div className="icon">{slides[currentIndex].icon}</div>
          <h2>{slides[currentIndex].title}</h2>
          <p>{slides[currentIndex].description}</p>
        </div>
        <div className="image">
          <img src={slid} alt="slide visual" />
        </div>
      </div>

      <button className="arrow right" onClick={goToNext}>
        &#8594;
      </button>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
