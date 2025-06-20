import React from 'react';
import '../styles/Properties.css';

const PropertyLists = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <div className="property-card" key={property.id}>
            <img src={property.image} alt={property.title} />
            <div className="property-info">
              <h4>{property.title}</h4>
              <p>{property.location}</p>
              <p>₦{property.price.toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyLists;
