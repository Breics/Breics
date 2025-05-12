import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaMediumM, FaPhoneAlt } from "react-icons/fa";
import logo from '../image/Logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="">
            <img src={logo} alt="B" />
          </a>
          <p>
            Your number one online real-estate manager, let’s help you manage your property,
            find vetted property, connect you with verified tenants and reliable home owners.
          </p>
        </div>

        <div className="footer-links">
          <ul>
            <li>Find a property</li>
            <li>List a property</li>
            <li>Become an agent</li>
          </ul>
          <ul>
            <li>About us</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>F.A.Q</li>
          </ul>
        </div>

        <div className="footer-contact">
          <p><strong>Contact us</strong></p>
          <p>15, Lekki Gardens, Lekki<br />Phase 1, Lagos</p>
          <p className="phone"><FaPhoneAlt /> +234-901-755-8180</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaMediumM />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2021 Breics Investment Limited. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
