import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/DasNavbar.css';
import logo from '../../image/Logo.png'

const Navbar = ({ user, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); // To be hooked to backend later
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="" />
        </Link>
      </div>

      <form className="navbar__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button type="submit" className="navbar__search-icon">
          <FaSearch />
        </button> */}
      </form>

      <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
        <Link to="/find-home">
          Find home <span>For renters</span>
        </Link>
        <Link to="/list-home">
          List your home <span>For Landlords</span>
        </Link>
        <Link to="/advertise-home">
          Advertise home <span>For Agents</span>
        </Link>
      </nav>

      <Link to="/profile" className="navbar__profile">
        <FaUserCircle className="profile-icon" />
        <span>{user?.name || 'User'}</span>
      </Link>

      <div className="navbar__toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar;
