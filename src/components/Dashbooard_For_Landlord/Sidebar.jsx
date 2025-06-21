import React, { useState, useEffect } from "react";
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
  FiUser,
  FiMenu,
  FiX
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: <FiGrid />, path: "/dashboard/dashboard-home" },
  { label: "Application", icon: <FiFileText />, path: "/dashboard/application" },
  { label: "My Properties", icon: <FiHome />, path: "/dashboard/properties" },
  { label: "My Tenants", icon: <FiUsers />, path: "/dashboard/tenants" },
  { label: "Payments", icon: <FiCreditCard />, path: "/dashboard/payments" },
  { label: "Facility", icon: <FiServer />, path: "/dashboard/facility" },
  // { label: "Administration", icon: <FiUserCheck />, path: "/dashboard/admin" },
  { label: "Support", icon: <FiSettings />, path: "/dashboard/support" },
  { label: "Account", icon: <FiUser />, path: "/dashboard/account" }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  // Auto-collapse sidebar on mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      <button
        className="text-2xl p-3 text-gray-600 hover:text-orange-500 transition self-end sm:self-start"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FiMenu /> : <FiX />}
      </button>

      <nav className="flex-1 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-500 border-r-4 border-orange-400"
                  : "text-gray-500 hover:text-orange-500 hover:bg-gray-50"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && (
              <span className="ml-3 whitespace-nowrap">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
