import React, { useState } from 'react';
import landlordImage from '../../image/land.jpg';

const ticketsData = [
  {
    title: 'Leaking Roof',
    category: 'Leakage',
    date: '01/09/2021',
    createdBy: 'Reserville Estate',
    createdRole: 'Landlord',
    assignedTo: 'Shehu Lawal',
    assignedRole: 'Tenant',
    status: 'Open',
  },
  {
    title: 'Broken Tap',
    category: 'Plumbing',
    date: '01/09/2021',
    createdBy: 'Reserville Estate',
    createdRole: 'Landlord',
    assignedTo: 'Shehu Lawal',
    assignedRole: 'Tenant',
    status: 'Closed',
  },
  {
    title: 'Burnt Meter',
    category: 'Wiring',
    date: '01/09/2021',
    createdBy: 'Reserville Estate',
    createdRole: 'Landlord',
    assignedTo: 'Shehu Lawal',
    assignedRole: 'Tenant',
    status: 'Open',
  },
  {
    title: 'Dirty Backyard',
    category: 'Housekeeping',
    date: '01/09/2021',
    createdBy: 'Shehu Lawal',
    createdRole: 'Tenant',
    assignedTo: 'Reserville Estate',
    assignedRole: 'Landlord',
    status: 'Closed',
  },
  {
    title: 'Littering',
    category: 'Sanitation',
    date: '01/09/2021',
    createdBy: 'Breics support',
    createdRole: 'Admin',
    assignedTo: 'Tenant',
    assignedRole: '',
    status: 'Open',
  },
];

export default function FacilityDashboard() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="p-4 md:p-8 bg-gray-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Facility Management</h2>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium">
          Escalate Issue
        </button>
      </div>

      {/* Info Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <button className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-4 py-2 rounded-md text-sm">
          Action required on 2 tickets
        </button>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {['All Tickets', 'Open Tickets', 'Closed Tickets'].map((label, i) => (
            <div key={i} className="bg-white shadow-sm p-4 rounded-md w-full sm:w-[180px]">
              <p className="text-sm text-gray-500">{label}</p>
              <h3 className="text-lg font-semibold text-gray-800">{i === 0 ? 10 : 5}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 text-sm mb-4 border-b pb-2">
        <span className="text-orange-500 font-semibold border-b-2 border-orange-500 pb-1 cursor-pointer">
          All tickets
        </span>
        <span className="text-gray-500 cursor-pointer">New tickets</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search ticket"
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm"
        />
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm">
          <option>All tickets</option>
        </select>
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm">
          <option>All dates</option>
        </select>
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm">
          <option>All status</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded-md shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-orange-50 text-gray-700">
            <tr>
              <th className="text-left p-3">Ticket title</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Date created</th>
              <th className="text-left p-3">Created by</th>
              <th className="text-left p-3">Assigned to</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ticketsData.map((ticket, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="p-3">{ticket.title}</td>
                <td className="p-3 text-orange-500 font-medium">{ticket.category}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={landlordImage}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-xs">
                      <span className="font-medium">{ticket.createdBy}</span>
                      <span className="text-gray-500">{ticket.createdRole}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={landlordImage}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-xs">
                      <span className="font-medium">{ticket.assignedTo}</span>
                      <span className="text-gray-500">{ticket.assignedRole}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      ticket.status === 'Open'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="relative p-3">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="text-gray-500 hover:text-gray-700 text-lg"
                  >
                    &#8942;
                  </button>
                  {openDropdown === index && (
                    <div className="absolute right-0 top-8 bg-white border shadow-md rounded-md text-sm z-10">
                      <ul className="min-w-[120px]">
                        {['View ticket', 'Edit ticket', 'Delete ticket', 'Close ticket'].map(
                          (item, i) => (
                            <li
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
        <div className="flex items-center gap-2 text-sm">
          Show:
          <select className="border border-gray-300 px-2 py-1 rounded-md">
            <option>5 rows</option>
          </select>
        </div>
        <div className="flex gap-4 text-sm text-gray-500 cursor-pointer">
          <span>Prev</span>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}
