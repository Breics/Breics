import React from "react";
import stud from "../image/stud.png";
import A from "../image/A.png";

const audience = [
  {
    title: "FOR STUDENTS",
    image: stud,
    description:
      "We understand how students need to get comfortable on a budget, at Breics we provide rooms that are conducive, budget friendly and at the same time close to your school.",
  },
  {
    title: "FOR THE WORKING CLASS",
    image: stud,
    description:
      "Find convenient spaces, rooms and homes close to work that helps you live smartly and efficiently. Choose what suits you or your organisation on Breics.",
  },
  {
    title: "FOR PEOPLE ON A BUDGET",
    image: stud,
    description:
      "At Breics we help you find and pay for rooms with flexible payment options to suit your budget.",
  },
];

const BreicsSuitable = () => {
  return (
    <div className="bg-white px-6 py-16 text-center">
      <h5 className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
        WE HAVE JUST THE RIGHT PROPERTIES FOR ANY GROUP OF PEOPLE
      </h5>
      <h2 className="text-3xl font-bold text-gray-800 mb-12">Breics is Suitable</h2>

      {/* Audience Cards */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {audience.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 max-w-xs shadow-lg text-left hover:-translate-y-1 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Responsive Side-by-Side Boxes */}
      <div className="flex flex-wrap gap-6 justify-center">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="flex-1 min-w-[280px] max-w-md bg-gray-100 p-6 rounded-xl shadow-md text-left"
          >
            <img
              src={A}
              alt="Card Icon"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Looking for a home</h3>
            <p className="text-gray-600 mb-4">
              Find the right home and property for you in the shortest time.
              Choose quality and convenience here on Breics.
            </p>
            <button className="w-44 py-2 px-4 rounded-md border border-[#F89822] bg-[#FEE7CD] text-[#F89822] text-sm font-medium hover:opacity-90 transition">
              Find Properties
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreicsSuitable;
