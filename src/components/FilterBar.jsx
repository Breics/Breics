import { useState } from "react";
import "../styles/FilterBar.css";

const propertyTypes = ['Apartment', 'Detached', 'Semi-detached', 'Bungalow', 'Duplex'];
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
    <div className="filter-bar">
      {/* Location Box */}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Property Type Dropdown */}
      <div className="dropdown">
        <button onClick={() => setShowTypeDropdown(!showTypeDropdown)}>
          Property Type
        </button>
        {showTypeDropdown && (
          <div className="dropdown-content">
            {propertyTypes.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Budget Dropdown */}
      <div className="dropdown">
        <button onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}>
          Budget
        </button>
        {showBudgetDropdown && (
          <div className="dropdown-content budget-box">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
