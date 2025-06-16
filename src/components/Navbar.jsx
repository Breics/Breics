import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../image/Logo.png';
import GetStartedModal from './GetStartedModal';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 relative z-10">
        <div className="font-bold text-xl text-orange-500">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        <div
          className={`md:flex gap-6 transition-all duration-300
            ${menuOpen ? 'flex flex-col items-center absolute top-[70px] left-0 right-0 bg-white py-4 z-40' : 'hidden'}
          `}
        >
          <NavLink to="/find-property" className={({ isActive }) => `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`}>
            <span className="font-semibold">Find a property</span>
            <small className="text-xs text-gray-500">For Renters</small>
          </NavLink>

          <NavLink to="/list-property" className={({ isActive }) => `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`}>
            <span className="font-semibold">List your property</span>
            <small className="text-xs text-gray-500">For Landlords</small>
          </NavLink>

          <NavLink to="/advertise" className={({ isActive }) => `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`}>
            <span className="font-semibold">Advertise a property</span>
            <small className="text-xs text-gray-500">For Agents</small>
          </NavLink>

          <NavLink to="/buy-to-let" className={({ isActive }) => `flex flex-col text-sm text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`}>
            <span className="font-semibold">Buy To Let</span>
            <small className="text-xs text-gray-500">For Investors</small>
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          

          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition"
            onClick={() => setModalOpen(true)}
          >
            Get Started
          </button>

          <div
            className={`text-2xl md:hidden cursor-pointer transition-transform ${menuOpen ? 'rotate-90' : ''}`}
            onClick={toggleMenu}
          >
            ☰
          </div>
        </div>
      </nav>

      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default NavBar;
