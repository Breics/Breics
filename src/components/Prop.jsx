import React from "react";
import citys from "../image/Frame 23.png";

const cities = [
  { name: "Lagos", properties: 112 },
  { name: "Ogun", properties: 112 },
  { name: "Ekiti", properties: 112 },
  { name: "Abuja", properties: 112 },
  { name: "Port-Harcourt", properties: 112 },
  { name: "Victoria-Island", properties: 112 },
  { name: "Wuse", properties: 112 },
  { name: "Magodo", properties: 112 },
];

const Properties = () => {
  return (
    <div className="bg-white px-6 py-10 text-center">
      <h4 className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
        WE ARE IN THESE CITIES
      </h4>
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Discover Properties Nearby
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-gray-100 p-5 rounded-xl shadow-sm hover:-translate-y-1 transform transition duration-300"
          >
            <img
              src={citys}
              alt={city.name}
              className="w-full h-auto rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {city.name}
            </h3>
            <p className="text-sm text-gray-500">{city.properties} properties</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
