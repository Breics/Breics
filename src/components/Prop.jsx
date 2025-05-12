import React from "react";
import "../styles/Prop.css";
import citys from '../image/Frame 23.png'
const cities = [
  { name: "Lagos", properties: 112, image:  {citys} },
  { name: "Ogun", properties: 112, image: {citys} },
  { name: "Ekiti", properties: 112, image: {citys} },
  { name: "Abuja", properties: 112, image: {citys} },
  { name: "Port-Harcourt", properties: 112, image: {citys} },
  { name: "Victoria-Island", properties: 112, image: {citys} },
  { name: "Wuse", properties: 112, image: {citys} },
  { name: "Magodo", properties: 112, image: {citys} },
];

const Properties = () => {
  return (
    <div className="cities-section">
      <h4 className="cities-subtitle">WE ARE IN THESE CITIES</h4>
      <h2 className="cities-title">Discover Properties Nearby</h2>
      <div className="cities-grid">
        {cities.map((city, index) => (
          <div className="city-card" key={index}>
            <img src={citys} alt={city.name} className="city-image" />
            <h3>{city.name}</h3>
            <p>{city.properties} properties</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;