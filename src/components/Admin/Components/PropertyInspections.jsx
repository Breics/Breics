// Applications.jsx
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PropInspections() {
  const [activeTab, setActiveTab] = useState("reservations");
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    type: "reservations",
    search: "",
    date: null,
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://breics-backend.onrender.com/api/applications", {
        params: {
          ...filters,
          date: filters.date ? filters.date.toISOString().split("T")[0] : "",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://breics-backend.onrender.com/api/applications/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchApplications();
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Applications</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Schedule appointment</button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 text-sm border-b">
       <a href="/admin-dashboard/application" className="text-sm py-2 border-b-2 border-transparent hover:border-orange-500">
          Reservations
        </a>
        <button className="text-sm py-2 border-b-2 border-orange-500 text-orange-500 font-medium">
          Inspection request <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-full text-xs">4</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center border rounded px-3 py-2 bg-white w-full sm:w-1/2 md:w-1/3">
          <input
            type="text"
            placeholder="Search reservation"
            className="outline-none w-full text-sm"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <FiSearch className="text-gray-400 ml-2" />
        </div>
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="border px-3 py-2 rounded">
          <option value="">All status</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <DatePicker
          selected={filters.date}
          onChange={(date) => setFilters({ ...filters, date })}
          placeholderText="All dates"
          className="border px-3 py-2 rounded w-[160px]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow mt-4">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-orange-50">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{app.date}</td>
                <td className="p-3 cursor-pointer text-orange-500" onClick={() => { setSelectedApp(app); setModalOpen(true); }}>{app.name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">{app.phone}</td>
                <td className="p-3">{app.address}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === "Accepted" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleAction(app._id, "accept")}
                    className="text-green-500 hover:underline text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(app._id, "reject")}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Application Details</h2>
            <div className="text-sm space-y-2">
              <p><strong>Name:</strong> {selectedApp.name}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Phone:</strong> {selectedApp.phone}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Date:</strong> {selectedApp.date}</p>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
