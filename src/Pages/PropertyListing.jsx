import NavBar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import PropertyLists from "../components/Properties";
import MapView from "../components/MapView";
import { useEffect, useState } from "react";
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
      const response = await axios.get("/api/properties", {
        params: {
          ...(location && { location }),
          ...(type && { type }),
          ...(budget && { budget }),
        },
      });
      setProperties(response.data);
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
