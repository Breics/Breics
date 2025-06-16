import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMediumM,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../image/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#fff8f1] text-[#333] py-16 px-4 font-sans">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Brand */}
        <div>
          <a href="/">
            <img src={logo} alt="Breics Logo" className="h-12 mb-4" />
          </a>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your number one online real-estate manager. Let’s help you manage
            your property, find vetted property, and connect you with verified
            tenants and reliable homeowners.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-10 text-black">
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black ">
                Find a property
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                List a property
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                Become an agent
              </a>
            </li>
          </ul>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition-colors text-black">
                F.A.Q
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold mb-2 text-sm">Contact us</p>
          <p className="text-sm mb-2">
            15, Lekki Gardens, Lekki
            <br />
            Phase 1, Lagos
          </p>
          <p className="flex items-center gap-2 text-sm font-medium mb-4 text-black">
            <FaPhoneAlt /> +234-901-755-8180
          </p>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-orange-500 text-black">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-orange-500 text-black ">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-500 text-black">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-500 text-black">
              <FaMediumM />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className="text-center mt-12 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        © 2021 Breics Investment Limited. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
