import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MyProperties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("All");
  const [occupancyFilter, setOccupancyFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch("https://breics-backend.onrender.com/api/properties")
      .then((res) => res.json())
      .then((data) => {
        const userProperties = data.data.filter(
          (property) => String(property.owner?._id) === String(userId)
        );
        setProperties(userProperties);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId, location.state]);

  const handleRowClick = (id) => navigate(`/dashboard/property/${id}`);
  const handleEdit = (id) => navigate(`/dashboard/edit-property/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const res = await fetch(`https://breics-backend.onrender.com/api/properties/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
        alert("Property deleted successfully.");
      } else alert("Failed to delete property.");
    } catch (err) {
      console.error(err);
      alert("Error deleting property.");
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyTypeFilter === "All" || p.propertyType === propertyTypeFilter;
    const matchesOccupancy =
      occupancyFilter === "All" ||
      (occupancyFilter === "Occupied" && p.occupied) ||
      (occupancyFilter === "Vacant" && !p.occupied);
    return matchesSearch && matchesType && matchesOccupancy;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">My Properties</h2>
        <div className="flex flex-wrap gap-3">
          <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 text-sm font-medium">
            Verify Property
          </button>
          <a
            href="/dashboard/new-property"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm font-medium"
          >
            List new property
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center bg-white p-4 rounded shadow-sm">
          <div className="w-9 h-9 rounded-full bg-orange-100 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">{properties.length}</h4>
            <p className="text-sm text-gray-500">Total properties</p>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 rounded shadow-sm">
          <div className="w-9 h-9 rounded-full bg-teal-100 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">
              {properties.filter((p) => p.occupied).length}
            </h4>
            <p className="text-sm text-gray-500">Occupied properties</p>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 rounded shadow-sm">
          <div className="w-9 h-9 rounded-full bg-red-100 mr-3" />
          <div>
            <h4 className="text-lg font-semibold">
              {properties.filter((p) => !p.occupied).length}
            </h4>
            <p className="text-sm text-gray-500">Unoccupied properties</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search property"
          className="px-3 py-2 border border-gray-300 rounded w-[150px] text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={propertyTypeFilter}
          onChange={(e) => {
            setPropertyTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="All">All types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
        </select>
        <select
          value={occupancyFilter}
          onChange={(e) => {
            setOccupancyFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="All">All occupancy</option>
          <option value="Occupied">Occupied</option>
          <option value="Vacant">Vacant</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Property title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Property type</th>
              <th className="px-4 py-3">Rent Fee</th>
              <th className="px-4 py-3">Property status</th>
              <th className="px-4 py-3">Occupancy status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProperties.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center px-4 py-4">
                  No properties found.
                </td>
              </tr>
            ) : (
              paginatedProperties.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(p._id)}
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={p.img}
                      alt="apt"
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{p.title}</span>
                  </td>
                  <td className="px-4 py-3">{p.location?.address}</td>
                  <td className="px-4 py-3">{p.propertyType}</td>
                  <td className="px-4 py-3">{p.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.verified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.verified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.occupied
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {p.occupied ? "Occupied" : "Vacant"}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(p._id);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(p._id);
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-6 text-sm">
        <span>Show: {itemsPerPage} rows</span>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
