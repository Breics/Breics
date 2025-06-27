import React from 'react';
import '../styles/Properties.css';
import backgroundImg from "../image/heo.jpg";

const PropertyLists = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <div className="property-card" key={property._id || property.id}>
            <img src={backgroundImg} alt={property.title} />
            <div className="property-info">
              <h4>{property.title}</h4>
              <p>
                {[
                  property.location?.address,
                  property.location?.city,
                  property.location?.state,
                  property.location?.country
                ]
                  .filter(Boolean)
                  .join(', ') || 'No location info'}
              </p>
              <p>₦{property.price?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyLists;
