import React from 'react';
import landlordImage from '../image/land.jpg';

const LandlordCTA = () => {
  return (
    <section className="flex flex-col md:flex-row items-center bg-[#1c1c1c] text-white h-auto md:h-[300px] overflow-hidden">
      {/* Text Section */}
      <div className="flex-1 p-6 md:p-10 z-10 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-extrabold mb-4">Are you a Landlord or Homeowner?</h2>
        <p className="text-sm md:text-base leading-relaxed mb-5">
          Get your home or property leased out faster on Breics. At Breics we help you worry less about late rent payments,
          tenant background checks and long move out, move-in time.
        </p>
        <button className="bg-[#fca311] hover:bg-[#ff9f1c] text-white px-5 py-2.5 text-sm md:text-base rounded-md transition duration-300">
          Start Here!!
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1 w-full h-60 md:h-full">
        <img
          src={landlordImage}
          alt="Landlord"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default LandlordCTA;
