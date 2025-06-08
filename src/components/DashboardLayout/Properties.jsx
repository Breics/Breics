import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/MyProperties.css";

const MyProperties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("All");
  const [occupancyFilter, setOccupancyFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch("https://breics-backend.onrender.com/api/properties")
      .then((res) => res.json())
      .then((data) => {
        const userProperties = data.data.filter(
          (property) => String(property.owner?._id) === String(userId)
        );
        setProperties(userProperties);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId, location.state]);

  const handleRowClick = (id) => {
    navigate(`/dashboard/property/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-property/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const res = await fetch(`https://breics-backend.onrender.com/api/properties/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProperties(prev => prev.filter(p => p._id !== id));
        alert("Property deleted successfully.");
      } else {
        alert("Failed to delete property.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting property.");
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyTypeFilter === "All" || p.propertyType === propertyTypeFilter;
    const matchesOccupancy =
      occupancyFilter === "All" ||
      (occupancyFilter === "Occupied" && p.occupied) ||
      (occupancyFilter === "Vacant" && !p.occupied);
    return matchesSearch && matchesType && matchesOccupancy;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
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
            <h4>{properties.filter((p) => p.occupied).length}</h4>
            <p>Occupied properties</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="icon unoccupied" />
          <div>
            <h4>{properties.filter((p) => !p.occupied).length}</h4>
            <p>Unoccupied properties</p>
          </div>
        </div>
      </div>

      <div className="table-controls">
        <input
          placeholder="Search property"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select value={propertyTypeFilter} onChange={(e) => {
          setPropertyTypeFilter(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="All">All types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
        </select>
        <select value={occupancyFilter} onChange={(e) => {
          setOccupancyFilter(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="All">All occupancy</option>
          <option value="Occupied">Occupied</option>
          <option value="Vacant">Vacant</option>
        </select>
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
          {paginatedProperties.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: "center" }}>No properties found.</td></tr>
          ) : (
            paginatedProperties.map((p, i) => (
              <tr key={i} className="clickable-row" onClick={() => handleRowClick(p._id)}>
                <td>
                  <img src={p.img} alt="apt" />
                  <span>{p.title}</span>
                </td>
                <td>{p.location?.address}</td>
                <td>{p.propertyType}</td>
                <td>{p.price}</td>
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
                <td>
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(p._id); }}>✏️</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(p._id); }}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <span>Show: {itemsPerPage} rows</span>
        <div>
          <button onClick={goToPrev} disabled={currentPage === 1}>Prev</button>
          <span style={{ margin: "0 10px" }}>{currentPage} / {totalPages}</span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
