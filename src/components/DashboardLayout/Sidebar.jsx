// Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFileText,
  FiHome,
  FiUsers,
  FiCreditCard,
  FiServer,
  FiUserCheck,
  FiSettings,
  FiUser
} from "react-icons/fi";
import "../../styles/Sidebar.css";

const navItems = [
  { label: "Dashboard", icon: <FiGrid />, path: "/dashboard/dashboard-home" },
  { label: "Application", icon: <FiFileText />, path: "/dashboard/application" },
  { label: "My Properties", icon: <FiHome />, path: "/dashboard/properties" },
  { label: "My Tenants", icon: <FiUsers />, path: "/dashboard/tenants" },
  { label: "Payments", icon: <FiCreditCard />, path: "/dashboard/payments" },
  { label: "Facility", icon: <FiServer />, path: "/dashboard/facility" },
  { label: "Administration", icon: <FiUserCheck />, path: "/dashboard/admin" },
  { label: "Support", icon: <FiSettings />, path: "/support" },
  { label: "Account", icon: <FiUser />, path: "/account" }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button
        className="toggle-button"
        onClick={() => setCollapsed(!collapsed)}
      >
        &#9776;
      </button>
      <nav>
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
