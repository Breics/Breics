import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'
import logo from '../image/Logo.png'


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/find-property" className="nav-item" activeClassName="active">
          <span>Find a property</span>
          <small>For Renters</small>
        </NavLink>
        <NavLink to="/list-property" className="nav-item" activeClassName="active">
          <span>List your property</span>
          <small>For Landlords & Managers</small>
        </NavLink>
        <NavLink to="/advertise" className="nav-item" activeClassName="active">
          <span>Advertise a property</span>
          <small>For Agents</small>
        </NavLink>
        <NavLink to="/buy-to-let" className="nav-item" activeClassName="active">
          <span>Buy To Let</span>
          <small>For Investors</small>
        </NavLink>
      </div>

      <div className="nav-actions">
      <NavLink to="/login" className="login" activeClassName="active">
          <span className='login'>login</span>
          
        </NavLink>
        <button className="get-started">Get Started</button>
        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
