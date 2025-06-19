import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../image/Logo.png';
import axios from 'axios';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
   const [userData, setUserData] = useState({
      firstName: '',
      isVerified: false,
      accountType: '',
    });
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    useEffect(() => {
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  if (!userId || !token) {
    console.warn('User ID or token not found in localStorage.');
    return;
  }

  axios
    .get(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const landlord = res.data.data.landlord;
      setUserData({
        firstName: landlord.firstName || '',
        isVerified: landlord.verificationStatus?.isVerified || false,
        accountType: landlord.accountType || '',
      });
    })
    .catch((err) => {
      console.error('Failed to fetch user data:', err.response?.data || err.message);
    });
}, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id'); // clear token or auth data
    navigate('/login'); // redirect to login
  };

  // Close dropdown on outside click


useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md relative z-50">
  {/* Logo */}
  <Link to="/" className="flex-shrink-0">
    <img src={logo} alt="Logo" className="h-8 w-auto" />
  </Link>

  {/* Desktop Nav */}
  <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
    <Link to="/find-home" className="flex flex-col items-start text-black">
      Find home <span className="text-xs text-gray-500">For renters</span>
    </Link>
    <Link to="/list-home" className="flex flex-col items-start text-black">
      List your home <span className="text-xs text-gray-500">For Landlords</span>
    </Link>
    <Link to="/advertise-home" className="flex flex-col items-start text-black">
      Advertise home <span className="text-xs text-gray-500">For Agents</span>
    </Link>
  </nav>

  {/* Right Side: Profile + Hamburger */}
  <div className="flex items-center gap-3 ml-2">
    {/* Profile */}
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer"
      >
        <FaUserCircle className="text-2xl" />
        {/* Always show name */}
        <span className="text-sm truncate max-w-[80px] sm:max-w-[120px]">
          {userData.firstName || "User"}
        </span>
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

    {/* Hamburger (Mobile) */}
    <div onClick={toggleMenu} className="md:hidden text-xl text-gray-700 cursor-pointer">
      {menuOpen ? <FaTimes /> : <FaBars />}
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 py-4 px-6 md:hidden z-40">
      <Link to="/find-home" onClick={toggleMenu} className="text-sm text-gray-700 font-medium">
        Find home <span className="block text-xs text-gray-500">For renters</span>
      </Link>
      <Link to="/list-home" onClick={toggleMenu} className="text-sm text-gray-700 font-medium">
        List your home <span className="block text-xs text-gray-500">For Landlords</span>
      </Link>
      <Link to="/advertise-home" onClick={toggleMenu} className="text-sm text-gray-700 font-medium">
        Advertise home <span className="block text-xs text-gray-500">For Agents</span>
      </Link>
    </div>
  )}
</header>

  );
};

export default Navbar;
