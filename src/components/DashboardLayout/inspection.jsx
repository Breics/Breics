import React, { useEffect, useState } from 'react';
import '../../styles/Inspection.css';


export default function InspectionRequests() {
  const [inspections, setInspections] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchInspections = () => {
    fetch('http://localhost:5000/api/inspections')
      .then(res => res.json())
      .then(data => setInspections(data));
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handleAction = async (id, action) => {
    await fetch(`http://localhost:5000/api/inspections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: action })
    });
    fetchInspections();
  };

  return (
    <div className="inspections-container">
      <div className="header">
        <h2>Applications</h2>
        <button className="add-btn">Add application</button>
      </div>

      <div className="tabs">
        <a href="/dashboard/application" className='tab'> Reservations </a>
        <button className="tab active">Inspection request <span>4</span></button>
      </div>

      <div className="filter-bar">
        <input type="text" className="search-input" placeholder="Search inspections" />
        <select><option>All reservations</option></select>
        <select><option>All dates</option></select>
        <select><option>All status</option></select>
      </div>

      <table className="inspections-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Property address</th>
            <th>Inspection date</th>
            <th>Inspection time</th>
            <th>Reservation status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((insp) => (
            <tr key={insp._id}>
              <td className="user-info">
                <img src={insp.avatar} alt="avatar" />
                {insp.name}
              </td>
              <td>{insp.address}</td>
              <td>{insp.date}</td>
              <td>{insp.time}</td>
              <td>
                <span className={`badge ${insp.status.toLowerCase()}`}>{insp.status}</span>
              </td>
              <td className="actions">
                <button className="dots">•••</button>
                <div className="menu">
                  <button onClick={() => setSelected(insp)}>View booking</button>
                  <button onClick={() => handleAction(insp._id, 'Accepted')}>Accept booking</button>
                  <button onClick={() => handleAction(insp._id, 'Rejected')}>Reject booking</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Booking Details</h3>
            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Address:</strong> {selected.address}</p>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Time:</strong> {selected.time}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <button onClick={() => setSelected(null)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
