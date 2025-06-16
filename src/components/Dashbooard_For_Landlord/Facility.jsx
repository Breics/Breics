import React, { useState } from 'react';
import '../../styles/Facility.css';
import landlordImage from '../../image/land.jpg';

const ticketsData = [
  {
    title: 'Leaking Roof',
    category: 'Leakage',
    date: '01/09/2021',
    createdBy: 'Reserville Estate',
    createdRole: 'Landlord',
    assignedTo: 'Shehu Lawal',
    assignedRole: 'Tenant',
    status: 'Open',
  },
  {
    title: 'Broken Tap',
    category: 'Plumbing',
    date: '01/09/2021',
    createdBy: 'Reserville Estate',
    createdRole: 'Landlord',
    assignedTo: 'Shehu Lawal',
    assignedRole: 'Tenant',
    status: 'Closed',
  },
  {
    title: 'Burnt Meter',
    category: 'Wiring',
    date: '01/09/2021',
    createdBy: 'Reserville Estate',
    createdRole: 'Landlord',
    assignedTo: 'Shehu Lawal',
    assignedRole: 'Tenant',
    status: 'Open',
  },
  {
    title: 'Dirty Backyard',
    category: 'Housekeeping',
    date: '01/09/2021',
    createdBy: 'Shehu Lawal',
    createdRole: 'Tenant',
    assignedTo: 'Reserville Estate',
    assignedRole: 'Landlord',
    status: 'Closed',
  },
  {
    title: 'Littering',
    category: 'Sanitation',
    date: '01/09/2021',
    createdBy: 'Breics support',
    createdRole: 'Admin',
    assignedTo: 'Tenant',
    assignedRole: '',
    status: 'Open',
  },
];

export default function FacilityDashboard() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="facility-dashboard">
      <div className="header-bar">
        <h2>Facility Management</h2>
        <button className="escalate-btn">Escalate Issue</button>
      </div>

      <div className="info-stats">
        <button className="action-required">Action required on 2 tickets</button>
        <div className="stats">
          <div className="stat-box">
            <p>All Tickets</p>
            <h3>10</h3>
          </div>
          <div className="stat-box">
            <p>Open Tickets</p>
            <h3>5</h3>
          </div>
          <div className="stat-box">
            <p>Closed Tickets</p>
            <h3>5</h3>
          </div>
        </div>
      </div>

      <div className="tabs">
        <span className="active">All tickets</span>
        <span>New tickets</span>
      </div>

      <div className="search-filter">
        <input type="text" className="search-input" placeholder="Search ticket" />
        <select className="ticket-filter">
          <option>All tickets</option>
        </select>
        <select className="ticket-filter">
          <option>All dates</option>
        </select>
        <select className="ticket-filter">
          <option>All status</option>
        </select>
      </div>

      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket title</th>
            <th>Category</th>
            <th>Date created</th>
            <th>Created by</th>
            <th>Assigned to</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ticketsData.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.title}</td>
              <td className="category-color">{ticket.category}</td>
              <td>{ticket.date}</td>
              <td>
                <div className="user-info">
                  <img src={landlordImage} alt="avatar" className="user-avatar" />
                  <div className="user-name-role">
                    <span>{ticket.createdBy}</span>
                    <span>{ticket.createdRole}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="user-info">
                  <img src={landlordImage} alt="avatar" className="user-avatar" />
                  <div className="user-name-role">
                    <span>{ticket.assignedTo}</span>
                    <span>{ticket.assignedRole}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className={`status-badge ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
              </td>
              <td className="action-cell">
                <button
                  className="dots"
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                >
                  &#8942;
                </button>
                {openDropdown === index && (
                  <div className="action-dropdown">
                    <ul>
                      <li>View ticket</li>
                      <li>Edit ticket</li>
                      <li>Delete ticket</li>
                      <li>Close ticket</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-controls">
        <div>
          Show:
          <select>
            <option>5 rows</option>
          </select>
        </div>
        <div className="pagination">
          <span>Prev</span>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}
