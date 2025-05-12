import React from 'react';
import '../styles/LandlordCTA.css';
import landlordImage from '../image/land.jpg'; // Make sure to place the image in /assets

const LandlordCTA = () => {
  return (
    <section className="landlord-cta">
      <div className="cta-text">
        <h2>Are you a Landlord or Homeowner?</h2>
        <p>
          Get your home or property leased out faster on Breics. At Breics we help you worry less about late rent payments, 
          tenant background checks and long move out, move-in time.
        </p>
        <button>Start Here!!</button>
      </div>
      <div className="cta-image">
        <img src={landlordImage} alt="Landlord" />
      </div>
    </section>
  );
};

export default LandlordCTA;
