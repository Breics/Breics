
import React from "react";
import { FaHome, FaMoneyBill, FaUsers, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../../styles/DashboardHome.css'

const StatCard = ({ title, total, breakdown }) => (
  <div className="stat-card">
    <div className="circle">{total}</div>
    <h4>{title}</h4>
    <ul>
      {breakdown.map((item, i) => (
        <li key={i}>
          <span className={`dot ${item.color}`}></span> {item.label}: {item.value}
        </li>
      ))}
    </ul>
  </div>
);

const ApplicationCard = ({ title, user, date }) => (
  <div className="app-card">
    <div>
      <img src="https://via.placeholder.com/40" alt="apartment" />
      <div className="app-info">
        <strong>{title}</strong>
        <span>{user}</span>
      </div>
    </div>
    <span>{date}</span>
    <Link to="/applications/view">View</Link>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="dashboard-container">
      <h2>Hi Shehu 👋</h2>
      <h3>Dashboard</h3>

      <div className="stats-grid">
        <StatCard
          title="Total Properties"
          total={22}
          breakdown={[
            { label: "Occupied properties", value: 12, color: "green" },
            { label: "Vacant properties", value: 2, color: "grey" },
            { label: "Pending verification", value: 8, color: "red" },
          ]}
        />
        <StatCard
          title="Rental Income"
          total={"₦ 6,100,000"}
          breakdown={[
            { label: "Paid rent", value: "₦ 4,000,000", color: "green" },
            { label: "Overdue rent", value: "₦ 2,100,000", color: "red" },
          ]}
        />
        <StatCard
          title="Tenants"
          total={22}
          breakdown={[
            { label: "Active Tenants", value: 16, color: "green" },
            { label: "Inactive Tenants", value: 6, color: "red" },
          ]}
        />
        <StatCard
          title="Tickets"
          total={12}
          breakdown={[
            { label: "Open tickets", value: 10, color: "green" },
            { label: "Closed tickets", value: 2, color: "red" },
          ]}
        />
      </div>

      <div className="applications-box">
        <div className="tabs">
          <strong>Applications</strong>
          <span className="badge">4</span>
        </div>
        <div className="apps-list">
          {[1, 2, 3, 4].map((_, i) => (
            <ApplicationCard
              key={i}
              title="Fully Furnished 2 Bedroom"
              user="Imade Imhavu"
              date="02/09/2021"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
