import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import PropertyLists from "../components/Properties";
import MapView from "../components/MapView";
import LandlordCTA from "../components/LandlordCTA";
import Footer from "../components/Footer";

const PropertyListing = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    budget: "",
  });
  const [properties, setProperties] = useState([]);
  const [showMap, setShowMap] = useState(true);

  const fetchProperties = async () => {
    try {
      const { location, type, budget } = filters;

      const response = await axios.get(
        "https://breics-backend.onrender.com/api/properties"
      );

      let filtered = response.data.data.filter((property) => property.status === "available");

      // Apply frontend filtering if backend doesn’t support query params
      if (location) {
        filtered = filtered.filter((p) =>
          p.location?.city?.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (type) {
        filtered = filtered.filter((p) =>
          p.propertyType?.toLowerCase().includes(type.toLowerCase())
        );
      }

      if (budget) {
        filtered = filtered.filter((p) => Number(p.price) <= Number(budget));
      }

      setProperties(filtered);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  return (
    <>
      <NavBar />
      <div>
        <FilterBar onFilterChange={setFilters} />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 20px",
          }}
        >
          <label>
            Show Map
            <input
              type="checkbox"
              checked={showMap}
              onChange={() => setShowMap((prev) => !prev)}
            />
          </label>
        </div>

        {showMap && <MapView properties={properties} />}
        <PropertyLists properties={properties} />
      </div>
      <LandlordCTA />
      <Footer />
    </>
  );
};

export default PropertyListing;
