import React, { useState } from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [destination, setDestination] = useState('Lekki');
  const [propertyType, setPropertyType] = useState('2 Bedroom');
  const [maxPrice, setMaxPrice] = useState('₦500,000');

  return (
    <section className="hero">
      <div className="overlay">
        <h1>
          Find Top-grade properties at <br />
          the <strong>Lowest Prices</strong> with <br />
          <strong>Flexible Payment Plans.</strong>
        </h1>
        <div className="search-box">
          <div className="select-group">
            <label>Destination</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option>Lekki</option>
              <option>Ajah</option>
              <option>Ikoyi</option>
            </select>
          </div>
          <div className="select-group">
            <label>Property type</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option>2 Bedroom</option>
              <option>3 Bedroom</option>
              <option>Studio</option>
            </select>
          </div>
          <div className="select-group">
            <label>Max Price</label>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option>₦500,000</option>
              <option>₦1,000,000</option>
              <option>₦2,000,000</option>
            </select>
          </div>
          <button className="search-btn">Search</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
