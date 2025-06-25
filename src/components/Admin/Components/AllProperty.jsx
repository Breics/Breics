import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome, FaCheck, FaClock } from "react-icons/fa";

const API_URL = "https://breics-backend.onrender.com/api/properties"; // change if needed

const Badge = ({ label, color }) => (
  <span className={`px-2 py-1 text-xs rounded-full ${color}`}>{label}</span>
);

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(API_URL, { withCredentials: true });
        setProperties(response.data);
      } catch (err) {
        setError("Failed to load properties.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const total = properties.length;
  const verified = properties.filter((p) => p.isVerified).length;
  const pending = total - verified;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Properties</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-100 rounded-lg p-4 flex items-center gap-4">
          <FaHome className="text-orange-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Total properties</p>
            <p className="text-xl font-semibold">{total}</p>
          </div>
        </div>
        <div className="bg-green-100 rounded-lg p-4 flex items-center gap-4">
          <FaCheck className="text-green-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Verified properties</p>
            <p className="text-xl font-semibold">{verified}</p>
          </div>
        </div>
        <div className="bg-red-100 rounded-lg p-4 flex items-center gap-4">
          <FaClock className="text-red-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Pending verification</p>
            <p className="text-xl font-semibold">{pending}</p>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">
            Verify Property
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600">
            List new property
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search property"
            className="border rounded px-3 py-1 text-sm w-40"
          />
          <select className="border rounded px-2 py-1 text-sm">
            <option>All dates</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm">
            <option>All status</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-auto">
        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading properties...</p>
        ) : error ? (
          <p className="text-red-600 text-center py-4">{error}</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Property title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Property type</th>
                <th className="p-3">Rent Fee</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Occupancy</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop._id} className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={prop.imageUrl || "https://via.placeholder.com/60"}
                      alt="property"
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{prop.title}</span>
                  </td>
                  <td className="p-3">{prop.location?.city || "—"}</td>
                  <td className="p-3">{prop.propertyType}</td>
                  <td className="p-3">{prop.rent}</td>
                  <td className="p-3">
                    <Badge
                      label={prop.isVerified ? "Verified" : "Unverified"}
                      color={
                        prop.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }
                    />
                  </td>
                  <td className="p-3">
                    <Badge
                      label={prop.isOccupied ? "Occupied" : "Unoccupied"}
                      color={
                        prop.isOccupied
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }
                    />
                  </td>
                  <td className="p-3">
                    <button className="text-gray-600 hover:text-black">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
