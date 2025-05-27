import React, { useState } from 'react';
import ActionMenu from './ActionMenu';
import '../../styles/Applications.css'

const dummyData = [
    {
      id: 1,
      name: 'Imade Imhavu',
      address: '15, Mende Str. Maryland, Lagos',
      date: '01/09/2021',
      amount: '₦ 500,000.01',
      status: 'Rejected',
      payment: 'Pending'
    },
    {
      id: 2,
      name: 'Imade Imhavu',
      address: '15, Mende Str. Maryland, Lagos',
      date: '01/09/2021',
      amount: '₦ 10,000.01',
      status: 'Accepted',
      payment: 'Paid'
    }
  ];
  
  function Application() {
    const [menuOpen, setMenuOpen] = useState(null);
  
    return (
      <div className="applications">
        <h2>Applications</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Property Address</th>
              <th>Date</th>
              <th>Amount Paid</th>
              <th>Reservation Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.address}</td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td>
                  <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
                </td>
                <td>
                  <span className={`payment ${row.payment.toLowerCase()}`}>{row.payment}</span>
                </td>
                <td>
                  <button onClick={() => setMenuOpen(menuOpen === row.id ? null : row.id)}>⋮</button>
                  {menuOpen === row.id && <ActionMenu />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Application;
  