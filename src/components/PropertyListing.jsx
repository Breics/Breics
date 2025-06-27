import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import Lis from '../image/lis.png';


const tabs = [
  'Shared space',
  'Bed space',
  'Self contained',
  '2 Bedrooms',
  '3 Bedrooms',
  'Properties To Let',
];

const dummyProperties = new Array(4).fill({
  image: Lis,
  title: 'Full Furnished Shared Space at Yaba with Parking Space',
  features: '2 bed(s)  •  2 bath(s)  •  Furnished',
  location: 'UNILAG, Lagos',
  listedBy: 'Reserville Estate',
});

const PropertySection = () => {
  const [activeTab, setActiveTab] = useState('Shared space');

  return (
    <section className="bg-white px-5 py-10">
      <h5 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Property Types</h5>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Choose a Property</h2>

      {/* Tabs */}
      <div className="flex gap-5 overflow-x-auto border-b-2 border-gray-200 pb-3 mb-8 whitespace-nowrap">
        {tabs.map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer pb-2 ${
              tab === activeTab
                ? 'border-b-[3px] border-orange-500 text-black font-semibold'
                : 'text-gray-600'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Property Cards */}
      <div className="flex flex-wrap gap-6 justify-between">
        {dummyProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertySection;
