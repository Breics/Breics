import React, { useEffect, useState } from 'react';

export default function PropInspections() {
  const [inspections, setInspections] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchInspections = () => {
    fetch('http://localhost:5000/api/inspections')
      .then(res => res.json())
      .then(data => setInspections(data));
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handleAction = async (id, action) => {
    await fetch(`http://localhost:5000/api/inspections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: action }),
    });
    fetchInspections();
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 bg-gray-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">Applications</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition">
          Add application
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 mb-4 w-full md:w-4/5">
        <a href="/admin-dashboard/application" className="text-sm py-2 border-b-2 border-transparent hover:border-orange-500">
          Reservations
        </a>
        <button className="text-sm py-2 border-b-2 border-orange-500 text-orange-500 font-medium">
          Inspection request <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-full text-xs">4</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search inspections"
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>All reservations</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>All dates</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>All status</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-md shadow-sm">
          <thead className="text-sm bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Property address</th>
              <th className="p-3 text-left">Inspection date</th>
              <th className="p-3 text-left">Inspection time</th>
              <th className="p-3 text-left">Reservation status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((insp) => (
              <tr key={insp._id} className="border-t">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={insp.avatar}
                    alt="avatar"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">{insp.name}</span>
                </td>
                <td className="p-3 text-sm">{insp.address}</td>
                <td className="p-3 text-sm">{insp.date}</td>
                <td className="p-3 text-sm">{insp.time}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs capitalize ${
                      insp.status === 'Accepted'
                        ? 'bg-green-100 text-green-700'
                        : insp.status === 'Rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {insp.status}
                  </span>
                </td>
                <td className="p-3 text-sm relative group">
                  <button className="text-xl">•••</button>
                  <div className="hidden group-hover:flex absolute z-10 right-0 top-full mt-2 bg-white shadow-md rounded-md flex-col min-w-[160px] border">
                    <button
                      className="text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setSelected(insp)}
                    >
                      View booking
                    </button>
                    <button
                      className="text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => handleAction(insp._id, 'Accepted')}
                    >
                      Accept booking
                    </button>
                    <button
                      className="text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => handleAction(insp._id, 'Rejected')}
                    >
                      Reject booking
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">Booking Details</h3>
            <p className="text-sm mb-1">
              <strong>Name:</strong> {selected.name}
            </p>
            <p className="text-sm mb-1">
              <strong>Address:</strong> {selected.address}
            </p>
            <p className="text-sm mb-1">
              <strong>Date:</strong> {selected.date}
            </p>
            <p className="text-sm mb-1">
              <strong>Time:</strong> {selected.time}
            </p>
            <p className="text-sm mb-3">
              <strong>Status:</strong> {selected.status}
            </p>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
