import React from 'react';
import '../styles/RentWithBreics.css';
import bedroomImg from '../image/bedroom.jpg';
import keyImg from '../image/key.jpg';
import { FaSearch, FaCalendarAlt, FaCreditCard, FaTools } from 'react-icons/fa';

const RentWithBreics = () => {
  return (
    <section className="rent-section">
      <div className="rent-text">
        <p className="subheading">LIMITLESS BENEFITS</p>
        <h2>Rent with Breics</h2>
        <p className="intro">
          Think of it, finding and managing a property these days is a lot of work.
          Let Breics help you manage all of that the way you'd love.
        </p>

        <div className="benefit">
          <FaSearch className="icon" />
          <div>
            <h4>Search your preferred property</h4>
            <p>Select from a wide range of vetted properties in our extensive and robust catalogue.</p>
          </div>
        </div>

        <div className="benefit">
          <FaCalendarAlt className="icon" />
          <div>
            <h4>Book for Inspection</h4>
            <p>
              Make reservations to physically visit at your convenience or opt for a virtual tour and
              inspect from anywhere in the world.
            </p>
          </div>
        </div>

        <div className="benefit">
          <FaCreditCard className="icon" />
          <div>
            <h4>Pay for a property</h4>
            <p>
              Make secure payments for properties of your choice with a flexible plan.
            </p>
          </div>
        </div>

        <div className="benefit">
          <FaTools className="icon" />
          <div>
            <h4>Manage your property</h4>
            <p>
              Track, manage and organize your rent, amenities and enquiries in one place.
            </p>
          </div>
        </div>
      </div>

      <div className="rent-images">
        <img src={bedroomImg} alt="Property bedroom" className="main-img" />
        <img src={keyImg} alt="Key handover" className="overlay-img" />
      </div>
    </section>
  );
};

export default RentWithBreics;
