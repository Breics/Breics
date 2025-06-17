import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../image/Logo.png';

const Navbar = ({ user, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md relative z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Search Bar - only on medium and up */}
      {/* <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center border border-gray-300 rounded-md px-3 py-1 mx-4 max-w-sm w-full"
      >
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow outline-none text-sm"
        />
        <button type="submit" className="text-orange-500">
          <FaSearch />
        </button>
      </form> */}

      {/* Nav Links - only on medium and up */}
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

      {/* Profile Icon */}
      <Link
        to="/profile"
        className="flex items-center gap-2 text-gray-600 text-sm ml-4"
      >
        <FaUserCircle className="text-xl" />
        <span className="hidden md:inline">{user?.name || 'User'}</span>
      </Link>

      {/* Mobile Toggle Button - hidden on md+ */}
      <div
        onClick={toggleMenu}
        className="md:hidden text-xl text-gray-700 cursor-pointer ml-3"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
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
