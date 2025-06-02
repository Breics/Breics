import '../../styles/Applications.css'
import React, { useEffect, useState } from 'react';


export default function Application () {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  return (
    <div className="reservations-container">
      <div className="header">
        <h2>Applications</h2>
        <button className="add-btn">Add application</button>
      </div>

      <div className="tabs">
        <button className="tab active">Reservations <span>4</span></button>
        <a href="/dashboard/inspection" className='tab'> Inspection Request</a>
        {/* <button className="tab">Inspection request <span>4</span></button> */}
      </div>

      <div className="filter-bar">
        <input type="text" className="search-input" placeholder="Search reservation" />
        <select><option>All reservations</option></select>
        <select><option>All dates</option></select>
        <select><option>All status</option></select>
      </div>

      <table className="reservations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Property address</th>
            <th>Date</th>
            <th>Amount Paid</th>
            <th>Reservation status</th>
            <th>Payment status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td className="user-info">
                <img src={res.avatar} alt="avatar" />
                {res.name}
              </td>
              <td>{res.address}</td>
              <td>{res.date}</td>
              <td>{res.amount}</td>
              <td><span className={`badge ${res.status.toLowerCase()}`}>{res.status}</span></td>
              <td><span className={`badge ${res.payment.toLowerCase()}`}>{res.payment}</span></td>
              <td className="actions">
                <button className="dots">•••</button>
                <div className="menu">
                  <button>View reservation</button>
                  <button>Accept reservation</button>
                  <button>Reject reservation</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
