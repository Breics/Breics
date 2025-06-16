import React, { useState } from 'react';
import heroImage from '../image/heo.jpg'; // import the background image

const HeroSection = () => {
  const [destination, setDestination] = useState('Lekki');
  const [propertyType, setPropertyType] = useState('2 Bedroom');
  const [maxPrice, setMaxPrice] = useState('₦500,000');

  return (
    <section
      className="relative h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed mb-8">
          Find Top-grade properties at <br />
          the <strong className="font-bold">Lowest Prices</strong> with <br />
          <strong className="font-bold">Flexible Payment Plans.</strong>
        </h1>

        {/* Search Box */}
        <div className="bg-white rounded-lg p-4 flex flex-wrap sm:flex-nowrap gap-4 items-end text-black max-w-4xl w-full justify-center">
          {/* Destination */}
          <div className="flex flex-col text-sm w-full sm:w-auto">
            <label className="mb-1 font-medium">Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-2 rounded border border-gray-300 text-base"
            >
              <option>Lekki</option>
              <option>Ajah</option>
              <option>Ikoyi</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="flex flex-col text-sm w-full sm:w-auto">
            <label className="mb-1 font-medium">Property type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="p-2 rounded border border-gray-300 text-base"
            >
              <option>Apartment</option>
              <option>Hostel</option>
              
            </select>
          </div>

          {/* Max Price */}
          <div className="flex flex-col text-sm w-full sm:w-auto">
            <label className="mb-1 font-medium">Max Price</label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="p-2 rounded border border-gray-300 text-base"
            >
              <option>₦500,000</option>
              <option>₦1,000,000</option>
              <option>₦2,000,000</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="bg-orange-500 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-orange-600 transition w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
