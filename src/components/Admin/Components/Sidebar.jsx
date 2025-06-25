import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiMail,
  FiFileText,
  FiHome,
  FiUsers,
  FiUserCheck,
  FiCreditCard,
  FiServer,
  FiUser,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: <FiGrid />, path: "/admin-dashboard/admin-index" },
  { label: "Mailbox", icon: <FiMail />, path: "/admin-dashboard/mail-box" },
  { label: "Application", icon: <FiFileText />, path: "/admin-dashboard/application" },
  { label: "Properties", icon: <FiHome />, path: "/admin-dashboard/allproperties" },
  { label: "Landlords", icon: <FiUserCheck />, path: "/admin-dashboard/alllanlords" },
  { label: "Tenants", icon: <FiUsers />, path: "/admin-dashboard/alltenants" },
  { label: "Agents", icon: <FiUserCheck />, path: "/admin-dashboard/agents" },
  { label: "Transactions", icon: <FiCreditCard />, path: "/admin-dashboard/transactions" },
  { label: "Facility", icon: <FiServer />, path: "/admin-dashboard/facility" },
  { label: "File manager", icon: <FiFileText />, path: "/admin-dashboard/file-manager" },
  { label: "Account", icon: <FiUser />, path: "/admin-dashboard/account" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

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
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
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

export default AdminSidebar;
