import React from "react";
import "../../styles/Tenants.css";
import landlordImage from '../../image/land.jpg';

const tenants = [
  {
    name: "Shehu Omotosho",
    id: "BR345009",
    phone: "09017556160",
    img: {landlordImage},
    rentExpiry: "30/09/2021",
  },
  {
    name: "Shehu Omotosho",
    id: "BR345009",
    phone: "09017556160",
    img: {landlordImage},
    rentExpiry: "30/09/2021",
  },
  {
    name: "Shehu Omotosho",
    id: "BR345009",
    phone: "09017556160",
    img: {landlordImage},
    rentExpiry: "30/09/2021",
  },
];

const TenantDashboard = () => {
  return (
    <div className="tenant-dashboard">
      <div className="dashboard-header">
        <h2>My Tenants</h2>
        <div className="dashboard-actions">
          <button className="import-btn">Import tenant(s)</button>
          <button className="move-btn">Move-in tenant</button>
        </div>
      </div>

      <div className="tenant-stats">
        <div className="stat-card total">
          <span className="icon total-icon"></span>
          <div>
            <h4>36</h4>
            <p>Total tenants</p>
          </div>
        </div>
        <div className="stat-card active">
          <span className="icon active-icon"></span>
          <div>
            <h4>29</h4>
            <p>Active tenants</p>
          </div>
        </div>
        <div className="stat-card overdue">
          <span className="icon overdue-icon"></span>
          <div>
            <h4>7</h4>
            <p>Overdue tenants</p>
          </div>
        </div>
      </div>

      <div className="tenant-controls">
        <div></div>
        <div className="con">
          <div className="view-toggle">
            <button className="grid active" />
            <button className="list" />
          </div>
          <select className="tenant-filter">
            <option>All tenants</option>
          </select>
          <button className="move-btn">Move-in tenant</button>
        </div>
      </div>

      <div className="tenant-cards">
        {tenants.map((t, i) => (
          <div className="tenant-card" key={i}>
            <div className="card-header">
              <img className="avatar" src={landlordImage} alt="avatar" />
              <button className="card-menu">...</button>
              <div className="menu-dropdown">
                <ul>
                  <li>View Tenant</li>
                  <li>Send Payment</li>
                  <li>Send Reminder</li>
                  <li>Escalate Issue</li>
                  <li>Send Document</li>
                  <li>Terminate</li>
                  <li>View Rental Status</li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <h4>{t.name}</h4>
              <p>ID: {t.id}</p>
              <p>{t.phone}</p>
              <span className="rent-expiry">Rent Expires {t.rentExpiry}</span>
              <button className="view-profile">View Profile</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>&lt;</button>
        <span className="active">1</span>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <button>12</button>
        <button>&gt;</button>
      </div>
    </div>
  );
};

export default TenantDashboard;
