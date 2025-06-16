import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../image/Logo.png';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 relative z-10">
      {/* Logo */}
      <div className="font-bold text-xl text-orange-500">
        <img src={logo} alt="Logo" className="h-8" />
      </div>

      {/* Nav Links */}
      <div
        className={`flex gap-6 transition-transform duration-300 ease-in-out
          md:static md:flex-row md:opacity-100 md:pointer-events-auto md:translate-y-0
          absolute top-[70px] left-0 right-0 bg-white flex-col items-center py-4
          ${menuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <NavLink
          to="/find-property"
          className={({ isActive }) =>
            `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${
              isActive ? 'text-orange-500' : ''
            }`
          }
        >
          <span className="font-semibold">Find a property</span>
          <small className="text-xs text-gray-500">For Renters</small>
        </NavLink>

        <NavLink
          to="/list-property"
          className={({ isActive }) =>
            `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${
              isActive ? 'text-orange-500' : ''
            }`
          }
        >
          <span className="font-semibold">List your property</span>
          <small className="text-xs text-gray-500">For Landlords & Managers</small>
        </NavLink>

        <NavLink
          to="/advertise"
          className={({ isActive }) =>
            `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${
              isActive ? 'text-orange-500' : ''
            }`
          }
        >
          <span className="font-semibold">Advertise a property</span>
          <small className="text-xs text-gray-500">For Agents</small>
        </NavLink>

        <NavLink
          to="/buy-to-let"
          className={({ isActive }) =>
            `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${
              isActive ? 'text-orange-500' : ''
            }`
          }
        >
          <span className="font-semibold">Buy To Let</span>
          <small className="text-xs text-gray-500">For Investors</small>
        </NavLink>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-sm cursor-pointer text-gray-700 hover:text-orange-500 ${
              isActive ? 'text-orange-500' : ''
            }`
          }
        >
          Login
        </NavLink>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition">
          Get Started
        </button>

        {/* Hamburger Menu */}
        <div
          className={`text-2xl md:hidden cursor-pointer transition-transform ${
            menuOpen ? 'rotate-90' : ''
          }`}
          onClick={toggleMenu}
        >
          ☰
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
