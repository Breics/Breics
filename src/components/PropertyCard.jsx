import React from 'react';
import '../styles/PropertyListing.css';
import Lis from '../image/lis.png';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={Lis} alt="property" />
        <button className="save-icon">💾</button>
      </div>
      <div className="property-body">
        <span className="badge">Shared space</span>
        <p className="price">₦10,000/month</p>
        <h4>{property.title}</h4>
        <p className="features">{property.features}</p>
        <p className="location">📍 {property.location}</p>
        <p className="listed-by">👤 Listed by {property.listedBy}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
