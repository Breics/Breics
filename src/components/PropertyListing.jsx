import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import '../styles/PropertyListing.css';
import Lis from '../image/lis.png';

const tabs = ['Shared space', 'Bed space', 'Self contained', '2 Bedrooms', '3 Bedrooms', 'Properties To Let'];

const dummyProperties = new Array(4).fill({
  image: {Lis},
  title: 'Full Furnished Shared Space at Yaba with Parking Space',
  features: '2 bed(s)  •  2 bath(s)  •  Furnished',
  location: 'UNILAG, Lagos',
  listedBy: 'Reserville Estate',
});

const PropertySection = () => {
  const [activeTab, setActiveTab] = useState('Shared space');

  return (
    <section className="property-section">
      <h5>PROPERTY TYPES</h5>
      <h2>Choose a Property</h2>
      <div className="property-tabs">
        {tabs.map((tab) => (
          <span key={tab} className={tab === activeTab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
            {tab}
          </span>
        ))}
      </div>
      <div className="property-cards">
        {dummyProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertySection;
