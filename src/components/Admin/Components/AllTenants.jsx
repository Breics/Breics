// Tenants.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical, FiSearch } from "react-icons/fi";

export default function AllTenants() {
  const [tenants, setTenants] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://breics-backend.onrender.com/api/tenants", {
        params: {
          search,
          status: filterStatus,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTenants(res.data.tenants);
      setStats(res.data.stats); // assume backend returns stats: { total, active, inactive }
    } catch (err) {
      console.error("Failed to fetch tenants:", err);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [search, filterStatus]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Tenants</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Import Tenants</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow flex items-center">
          <div className="text-orange-500 text-2xl">🏠</div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Total Tenants</p>
            <p className="text-xl font-semibold">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center">
          <div className="text-green-500 text-2xl">🏠</div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Active Tenants</p>
            <p className="text-xl font-semibold">{stats.active}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center">
          <div className="text-red-500 text-2xl">🏠</div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Inactive Tenants</p>
            <p className="text-xl font-semibold">{stats.inactive}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mt-6 gap-3">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search tenants"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded pr-10 text-sm"
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border px-3 py-2 rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All tenants</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 bg-white rounded shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-orange-50">
            <tr>
              <th className="p-3">Serial No</th>
              <th className="p-3">Tenant ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, idx) => (
              <tr key={tenant._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{String(idx + 1).padStart(3, "0")}</td>
                <td
                  className="p-3 text-orange-500 cursor-pointer"
                  onClick={() => navigate(`/admin-dashboard/tenants/${tenant._id}`)}
                >
                  {tenant.tenantId || tenant._id.slice(-6)}
                </td>
                <td
                  className="p-3 cursor-pointer"
                  onClick={() => navigate(`/admin-dashboard/tenants/${tenant._id}`)}
                >
                  {tenant.name}
                </td>
                <td className="p-3">{tenant.email}</td>
                <td className="p-3 relative">
                  <button className="text-gray-600 hover:text-orange-500">
                    <FiMoreVertical />
                  </button>
                  {/* Dropdown menu can be implemented here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
