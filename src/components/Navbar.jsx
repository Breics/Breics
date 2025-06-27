import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../image/Logo.png';
import axios from 'axios';
import GetStartedModal from './GetStartedModal';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({ firstName: '' });
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (token && userId) {
      setIsAuthenticated(true);
      axios
        .get(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          const landlord = res.data.data.landlord;
          setUserData({ firstName: landlord.firstName || 'User' });
        })
        .catch(err => {
          console.error('User fetch error:', err);
          setIsAuthenticated(false);
        });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 relative z-10">
        {/* Logo */}
        <div className="font-bold text-xl text-orange-500">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Main Nav */}
        <div className={`md:flex gap-6 transition-all duration-300 ${menuOpen ? 'flex flex-col items-center absolute top-[70px] left-0 right-0 bg-white py-4 z-40' : 'hidden'}`}>
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

        {/* Right Side: Profile or Get Started */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer"
              >
                <FaUserCircle className="text-2xl" />
                <span className="text-sm">{userData.firstName}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition"
              onClick={() => setModalOpen(true)}
            >
              Get Started
            </button>
          )}

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
