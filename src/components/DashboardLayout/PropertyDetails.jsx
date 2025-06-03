import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!property) return <div className="not-found">Property not found</div>;

  return (
    <div className="property-details-container">
      <div className="property-header">
        <h2>{property.title}</h2>
        <div className="meta">
          <span>Posted: {property.postedDate}</span>
          <span className={`tag ${property.verified ? "verified" : "unverified"}`}>
            {property.verified ? "Verified" : "Unverified"}
          </span>
          <span className={`tag ${property.occupied ? "occupied" : "vacant"}`}>
            {property.occupied ? "Occupied" : "Vacant"}
          </span>
        </div>
        <button className="action-button">Actions</button>
      </div>

      <div className="tabs">
        {["Overview", "Facility", "Payments", "Documents", "Tenant"].map((tab, i) => (
          <button key={i} className={`tab ${i === 0 ? "active" : ""}`}>{tab}</button>
        ))}
      </div>

      <div className="occupancy-section">
        <div className="rent-expiry">
          <h4>Rent expires</h4>
          <p>On {property.rentExpiry}</p>
          <p>{property.rent}/year</p>
          <button className="reminder-btn">Send reminder</button>
          <button className="terminate-btn">Terminate</button>
        </div>
        <div className="tenant-info">
          <p>{property.tenant.name}</p>
          <p>{property.tenant.email}</p>
          <p>{property.tenant.phone}</p>
          <p>{property.tenant.occupation}</p>
        </div>
      </div>

      <div className="general-info">
        <h3>General Information</h3>
        <p>{property.description}</p>
        <div className="info-tags">
          <span>{property.bedrooms} Bedroom</span>
          <span>{property.bathrooms} Bathroom</span>
          <span>{property.gender}</span>
          <span>{property.serviced ? "Serviced" : "Not Serviced"}</span>
        </div>
        <div className="meta-grid">
          <div><strong>Property ID:</strong> {property.id}</div>
          <div><strong>Type:</strong> {property.type}</div>
          <div><strong>Year Built:</strong> {property.yearBuilt}</div>
          <div><strong>Lease Type:</strong> {property.leaseType}</div>
        </div>
      </div>

      <div className="image-gallery">
        <h3>Property Images</h3>
        <div className="images-row">
          {property.images.map((img, i) => (
            <img key={i} src={img} alt={`property-${i}`} />
          ))}
        </div>
      </div>

      <div className="location-section">
        <h3>Property Location</h3>
        <iframe
          title="map"
          src={property.mapEmbed}
          className="map-frame"
        />
        <div className="location-info">
          <p>{property.address}</p>
          <p>{property.city}, {property.state}, {property.country}</p>
          <p>ZIP: {property.zip}</p>
          <p>Landmark: {property.landmark}</p>
        </div>
      </div>

      <div className="preferences-amenities">
        <div className="preferences">
          <h3>Special Preferences</h3>
          <p><strong>Religion:</strong> {property.preferences.religion}</p>
          <p><strong>Tribe:</strong> {property.preferences.tribe}</p>
          <p><strong>Marital Status:</strong> {property.preferences.marital}</p>
          <p><strong>Employment Status:</strong> {property.preferences.employment}</p>
          <p><strong>Studio Use:</strong> {property.preferences.studioUse ? "Yes" : "No"}</p>
          <p><strong>Max Co-resident:</strong> {property.preferences.coResidents}</p>
        </div>
        <div className="amenities">
          <h3>Property Amenities</h3>
          <ul>
            {property.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="attractions">
        <h3>Neighbourhood & Side Attractions</h3>
        <ul>
          {property.attractions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetails;
