import React from 'react';
import '../styles/StatsSection.css';
import { FaHome, FaBuilding, FaBed } from 'react-icons/fa';
import CountUp from 'react-countup';

const StatsSection = () => {
  return (
    <section className="stats">
      <div className="stat-box">
        <FaHome className="icon" />
        <div>
          <h2>
            Over <span><CountUp end={200000} duration={2.5} separator="," /></span>
          </h2>
          <p>Daily Listings</p>
        </div>
      </div>
      <div className="stat-box">
        <FaBuilding className="icon" />
        <div>
          <h2>
            Over <span><CountUp end={200000} duration={2.5} separator="," /></span>
          </h2>
          <p>Properties Vetted<br />for rent & lease</p>
        </div>
      </div>
      <div className="stat-box">
        <FaBed className="icon" />
        <div>
          <h2>
            Over <span><CountUp end={200000} duration={2.5} separator="," /></span>
          </h2>
          <p>Successfully closed<br />deals on Breics</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
