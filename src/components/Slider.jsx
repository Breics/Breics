import React, { useState, useEffect } from "react";
import slid from "../image/slid.png";

const slides = [
  {
    title: "Find Leases on any Budget",
    description:
      "Save cost on relocating. Find convenient properties and rentals suitable for your lifestyle",
    icon: "🏡",
    image: slid,
  },
  {
    title: "Discover Prime Locations",
    description:
      "Get access to properties in high-demand neighborhoods with great amenities.",
    icon: "📍",
    image: slid,
  },
  {
    title: "Secure and Easy Payments",
    description:
      "Enjoy peace of mind with secure transactions and flexible payment options.",
    icon: "💳",
    image: slid,
  },
  {
    title: "Move-in Ready Homes",
    description:
      "Browse listings of fully furnished and ready-to-occupy homes.",
    icon: "📦",
    image: slid,
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoscroll logic (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex flex-col items-center justify-center px-5 py-10 bg-[#fef7ee] min-h-[50vh] overflow-hidden">
      {/* Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl bg-transparent border-none z-10 cursor-pointer"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl bg-transparent border-none z-10 cursor-pointer"
      >
        &#8594;
      </button>

      {/* Slide Content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full max-w-5xl py-10 px-4">
        <div className="flex-1 text-center md:text-left">
          <div className="text-5xl mb-4">{slides[currentIndex].icon}</div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            {slides[currentIndex].title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {slides[currentIndex].description}
          </p>
        </div>
        <div className="flex-1 text-center">
          <img
            src={slides[currentIndex].image}
            alt="slide visual"
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex gap-3">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
