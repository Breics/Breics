import React from "react";
// import hero from "../image/Hero.jpg";
import promoCard from "../image/card.png";
import "../styles/LandLordHero.css";

const LandLordHero = () => {
  return (
    <>
      <div className="herosection">
        <div className="herotext">
          <div className="text">
            <small>For Landlords, property owners and property managers</small>
            <h1>Get the most out of your <br/> properties.</h1>
            <p>
              List your properties on Breics and get it occupied by verified and
              vetted tenants in no time at all, at no extra fees.
            </p>
            <button>List your property</button>
          </div>
        </div>
        <div className="heroimg">
            <div>
              <img src={promoCard} alt="" />
            </div>

        </div>
      </div>
    </>
  );
};

export default LandLordHero;
