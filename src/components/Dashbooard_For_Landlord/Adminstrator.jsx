import React, { useState } from 'react';
import landlordImage from '../../image/land.jpg';

const usersData = [
  { name: 'Reserville Estate', email: 'ade4u@gmail.com', role: 'Owner', status: 'Active', dateAdded: '01/09/2021', subtitle: 'Landlord' },
  { name: 'Reserville Estate', email: 'ade4u@gmail.com', role: 'Caretaker', status: 'Pending', dateAdded: '01/09/2021', subtitle: 'Caretaker' },
  { name: 'Reserville Estate', email: 'ade4u@gmail.com', role: 'Artisan', status: '', dateAdded: '01/09/2021', subtitle: 'Artisan' },
  { name: 'Shehu Lawal', email: 'ade4u@gmail.com', role: 'Supervisor', status: '', dateAdded: '01/09/2021', subtitle: 'Supervisor' },
  { name: 'Laolu Onifade', email: 'ade4u@gmail.com', role: 'Admin', status: 'Active', dateAdded: '01/09/2021', subtitle: 'Admin' }
];

export default function Administrator() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openRoleMenu, setOpenRoleMenu] = useState(null);

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button className="bg-orange-400 text-white rounded px-4 py-2 font-medium text-sm w-full md:w-auto">+ Add Users</button>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <input type="text" placeholder="Search user" className="border border-gray-300 rounded px-3 py-2 w-full md:w-64" />
        <select className="border border-gray-300 rounded px-3 py-2 w-full md:w-auto">
          <option>All users</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-sm rounded-md">
          <thead className="bg-gray-100 text-sm font-medium">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left hidden md:table-cell">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Date added</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="p-4">
                  <div className="flex items-center">
                    <img src={landlordImage} alt="avatar" className="w-8 h-8 rounded-full object-cover mr-3" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">{user.email}</td>
                <td className="p-4 relative">
                  <button
                    onClick={() => setOpenRoleMenu(openRoleMenu === index ? null : index)}
                    className="flex items-center font-medium cursor-pointer hover:underline"
                  >
                    {user.role} <span className="ml-1 text-xs">▼</span>
                  </button>
                  {openRoleMenu === index && (
                    <ul className="absolute bg-white border rounded shadow-md mt-1 z-10">
                      {['Caretaker', 'Supervisor', 'Admin', 'Artisan'].map(role => (
                        <li key={role} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">{role}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="p-4">{user.dateAdded}</td>
                <td className="p-4">
                  {user.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  )}
                </td>
                <td className="p-4 relative">
                  <button
                    className="text-xl font-bold"
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  >
                    &#8942;
                  </button>
                  {openDropdown === index && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                      <ul>
                        <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">View user</li>
                        <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Edit role</li>
                        <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Delete user</li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm">
        <div className="mb-2 md:mb-0">
          Show:
          <select className="ml-2 px-2 py-1 border rounded">
            <option>5 rows</option>
          </select>
        </div>
        <div className="flex gap-4 text-indigo-600 cursor-pointer">
          <span>Prev</span>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}
