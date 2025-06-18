import React, { useEffect, useState } from 'react';

export default function Application() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6 font-sans bg-gray-100">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold">Applications</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded font-medium text-sm">Add application</button>
      </div>

      <div className="flex flex-wrap gap-4 border-b border-gray-300 mt-4 mb-4">
        <button className="relative text-gray-600 border-b-2 border-orange-500 pb-1">Reservations <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">4</span></button>
        <a href="/dashboard/inspection" className="text-gray-600 pb-1">Inspection Request</a>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input type="text" placeholder="Search reservation" className="flex-1 min-w-[180px] px-3 py-2 border border-gray-300 rounded text-sm" />
        <select className="px-3 py-2 rounded border border-gray-300 text-sm">
          <option>All reservations</option>
        </select>
        <select className="px-3 py-2 rounded border border-gray-300 text-sm">
          <option>All dates</option>
        </select>
        <select className="px-3 py-2 rounded border border-gray-300 text-sm">
          <option>All status</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="p-3">Name</th>
              <th className="p-3">Property address</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount Paid</th>
              <th className="p-3">Reservation status</th>
              <th className="p-3">Payment status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-3 flex items-center gap-2">
                  <img src={res.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  {res.name}
                </td>
                <td className="p-3">{res.address}</td>
                <td className="p-3">{res.date}</td>
                <td className="p-3">{res.amount}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${res.status.toLowerCase() === 'accepted' ? 'bg-green-100 text-green-600' : res.status.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}>{res.status}</span>
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${res.payment.toLowerCase() === 'paid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{res.payment}</span>
                </td>
                <td className="p-3 relative group">
                  <button className="text-lg">•••</button>
                  <div className="absolute right-0 mt-1 hidden group-hover:flex flex-col bg-white rounded shadow z-10 min-w-[140px]">
                    <button className="px-4 py-2 text-left text-sm hover:bg-gray-100">View reservation</button>
                    <button className="px-4 py-2 text-left text-sm hover:bg-gray-100">Accept reservation</button>
                    <button className="px-4 py-2 text-left text-sm hover:bg-gray-100">Reject reservation</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}