import React from 'react';
import { FaHome, FaBuilding, FaBed } from 'react-icons/fa';
import CountUp from 'react-countup';

const Statsection = () => {
  return (
    <section className="bg-blue-700 text-white px-4 py-12 flex flex-wrap justify-around gap-8 text-left">
      {/* Daily Listings */}
      <div className="flex items-center gap-4 max-w-[250px]">
        <FaHome className="text-2xl text-white" />
        <div>
          <h2 className="text-xl font-semibold">
            Over <span className="font-bold"><CountUp end={200000} duration={2.5} separator="," /></span>
          </h2>
          <p className="text-sm leading-snug">Daily Listings</p>
        </div>
      </div>

      {/* Properties Vetted */}
      <div className="flex items-center gap-4 max-w-[250px]">
        <FaBuilding className="text-2xl text-white" />
        <div>
          <h2 className="text-xl font-semibold">
            Over <span className="font-bold"><CountUp end={200000} duration={2.5} separator="," /></span>
          </h2>
          <p className="text-sm leading-snug">
            Properties Vetted<br />for rent & lease
          </p>
        </div>
      </div>

      {/* Successfully Closed Deals */}
      <div className="flex items-center gap-4 max-w-[250px]">
        <FaBed className="text-2xl text-white" />
        <div>
          <h2 className="text-xl font-semibold">
            Over <span className="font-bold"><CountUp end={200000} duration={2.5} separator="," /></span>
          </h2>
          <p className="text-sm leading-snug">
            Successfully closed<br />deals on Breics
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statsection;
