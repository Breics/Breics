import { useState } from "react";

const propertyTypes = ["Apartment", "Detached", "Semi-detached", "Bungalow", "Duplex"];

const FilterBar = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = () => {
    const budget = minPrice || maxPrice ? `${minPrice}-${maxPrice}` : "";
    onFilterChange({
      location,
      type: selectedTypes.join(","),
      budget,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-md z-20 relative">
      {/* Location Input */}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 w-full sm:w-auto"
      />

      {/* Property Type Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
        >
          Property Type
        </button>
        {showTypeDropdown && (
          <div className="absolute top-[110%] left-0 w-44 min-w-[180px] bg-white border border-gray-200 rounded-md shadow-lg p-3 z-50">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 mb-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="accent-orange-500"
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Budget Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
        >
          Budget
        </button>
        {showBudgetDropdown && (
          <div className="absolute top-[110%] left-0 w-44 min-w-[180px] bg-white border border-gray-200 rounded-md shadow-lg p-3 z-50">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full mb-2 px-2 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition text-sm"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
