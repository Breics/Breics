import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ← Import navigation
import "../../styles/MyProperties.css";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); // ← Hook for routing

  useEffect(() => { 
    fetch("http://localhost:5000/api/properties")
      .then(res => res.json())                                                                 
      .then(data => setProperties(data));
  }, []);

  const handleRowClick = (id) => {
    navigate(`/dashboard/property/${id}`); // ← Navigate to property details
  };

  return (
    <div className="properties-container">
      <div className="header-row">
        <h2>My Properties</h2>
        <div className="action-buttons">
          <button className="verify-btn">Verify Property</button>
          <a href="/dashboard/new-property" className="new-btn">List new property</a>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="icon home" />
          <div>
            <h4>{properties.length}</h4>
            <p>Total properties</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="icon occupied" />
          <div>
            <h4>{properties.filter(p => p.occupied).length}</h4>
            <p>Occupied properties</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="icon unoccupied" />
          <div>
            <h4>{properties.filter(p => !p.occupied).length}</h4>
            <p>Unoccupied properties</p>
          </div>
        </div>
      </div>

      <div className="table-controls">
        <input placeholder="Search property" />
        <select><option>All properties</option></select>
        <select><option>All dates</option></select>
        <select><option>All status</option></select>
        <button className="submit-btn">Submit new property</button>
      </div>

      <table className="property-table">
        <thead>
          <tr>
            <th>Property title</th>
            <th>Location</th>
            <th>Property type</th>
            <th>Rent Fee</th>
            <th>Property status</th>
            <th>Occupancy status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => (
            <tr key={i} onClick={() => handleRowClick(p._id)} className="clickable-row">
              <td><img src={p.img} alt="apt" /><span>{p.title}</span></td>
              <td>{p.location}</td>
              <td>{p.type}</td>
              <td>{p.rent}</td>
              <td>
                <span className={`tag ${p.verified ? "verified" : "unverified"}`}>
                  {p.verified ? "Verified" : "Unverified"}
                </span>
              </td>
              <td>
                <span className={`tag ${p.occupied ? "occupied" : "vacant"}`}>
                  {p.occupied ? "Occupied" : "Vacant"}
                </span>
              </td>
              <td><span className="dots">...</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>Show: 5 rows</span>
        <div>
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
