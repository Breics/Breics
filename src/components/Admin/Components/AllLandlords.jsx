import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCheck, FaTimes } from "react-icons/fa";

const API_URL = "https://breics-backend.onrender.com/api/landlords";

const AllLandlords = () => {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandlords = async () => {
      try {
        const response = await axios.get(API_URL, { withCredentials: true });
        setLandlords(response.data);
      } catch (err) {
        setError("Failed to load landlords.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandlords();
  }, []);

  const filteredLandlords =
    filter === "all"
      ? landlords
      : landlords.filter((l) =>
          filter === "active" ? l.status === "active" : l.status !== "active"
        );

  const total = landlords.length;
  const active = landlords.filter((l) => l.status === "active").length;
  const inactive = total - active;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Landlords</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-100 rounded-lg p-4 flex items-center gap-4">
          <FaHome className="text-orange-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Total landlords</p>
            <p className="text-xl font-semibold">{total}</p>
          </div>
        </div>
        <div className="bg-green-100 rounded-lg p-4 flex items-center gap-4">
          <FaCheck className="text-green-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Active landlords</p>
            <p className="text-xl font-semibold">{active}</p>
          </div>
        </div>
        <div className="bg-red-100 rounded-lg p-4 flex items-center gap-4">
          <FaTimes className="text-red-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Inactive landlords</p>
            <p className="text-xl font-semibold">{inactive}</p>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search landlords"
          className="border rounded px-3 py-1 text-sm w-40"
        />

        <div className="flex gap-2 flex-wrap items-center">
          <select
            className="border rounded px-2 py-1 text-sm"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All landlords</option>
            <option value="active">Verified Landlords</option>
            <option value="inactive">Pending Verification</option>
          </select>

          <button className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">
            Export
          </button>
        </div>
      </div>

      {/* Landlord Table */}
      <div className="overflow-auto">
        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading landlords...</p>
        ) : error ? (
          <p className="text-red-600 text-center py-4">{error}</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Serial No</th>
                <th className="p-3">Landlord ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLandlords.map((landlord, index) => (
                <tr
                  key={landlord._id}
                  className="border-t cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/landlords/${landlord._id}`)}
                >
                  <td className="p-3">{String(index + 1).padStart(3, "0")}</td>
                  <td className="p-3 text-blue-500">{landlord.landlordId}</td>
                  <td className="p-3">{landlord.name}</td>
                  <td className="p-3">{landlord.email}</td>
                  <td className="p-3">
                    <button className="text-gray-600 hover:text-black">
                      •••
                    </button>
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

export default AllLandlords;
