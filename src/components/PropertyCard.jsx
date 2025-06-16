import React from 'react';
import Lis from '../image/lis.png';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-xs overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img src={Lis} alt="property" className="w-full h-52 object-cover" />
        <button className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 text-sm hover:bg-black">
          💾
        </button>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded mb-2 inline-block">
          Shared space
        </span>
        <p className="font-bold text-gray-800 mb-2">₦10,000/month</p>
        <h4 className="text-base font-semibold text-gray-900 mb-2">{property.title}</h4>
        <p className="text-sm text-gray-600 mb-1">{property.features}</p>
        <p className="text-sm text-gray-600 mb-1">📍 {property.location}</p>
        <p className="text-sm text-gray-500 italic">👤 Listed by {property.listedBy}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
