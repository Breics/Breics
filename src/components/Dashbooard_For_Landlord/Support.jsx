import React, { useEffect, useState } from 'react';
import '../../styles/Support.css';

export default function SupportDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="support-dashboard">
      <div className="support-header">
        <div className="support-box">
          <h4>Get Support</h4>
          <p>support@breics.com</p>
          <p>+2349017668909</p>
        </div>
        <div className="raise-box">
          <h4>Raise Ticket</h4>
          <p>Create a support ticket</p>
          <button>Create Ticket →</button>
        </div>
      </div>

      <div className="tickets-section">
        <div className="tabs">
          <span className="active">All tickets</span>
          <span>New tickets</span>
        </div>

        <div className="search-filter">
          <input type="text" placeholder="Search ticket" />
          <select><option>All tickets</option></select>
          <select><option>All dates</option></select>
          <select><option>All status</option></select>
        </div>

        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket title</th>
              <th>Category</th>
              <th>Date created</th>
              <th>Created by</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.title}</td>
                <td className="category">{ticket.category}</td>
                <td>{ticket.dateCreated}</td>
                <td>
                  <div className="user-info">
                    <img src="/avatar.png" alt="avatar" className="user-avatar" />
                    <div>
                      <div>{ticket.createdBy}</div>
                      <div className="role">{ticket.createdRole}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  <button className="dots">&#8942;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
