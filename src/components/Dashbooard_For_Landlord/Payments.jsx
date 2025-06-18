import React from "react";

const transactions = [
  {
    serial: "PR-2021-01",
    type: "Rent",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦500,000.01",
    verification: "Unverified",
    payment: "Pending",
  },
  {
    serial: "PR-2021-01",
    type: "Service charge",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦10,000.01",
    verification: "Unverified",
    payment: "Pending",
  },
  {
    serial: "PR-2021-01",
    type: "Leak Repairs",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦30,000.01",
    verification: "Verified",
    payment: "Paid",
  },
  {
    serial: "PR-2021-01",
    type: "Service charge",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦10,000.01",
    verification: "Unverified",
    payment: "Pending",
  },
  {
    serial: "PR-2021-01",
    type: "Rent",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦500,000.01",
    verification: "Verified",
    payment: "Paid",
  },
];

const badgeStyle = {
  Verified: "bg-green-100 text-green-600",
  Unverified: "bg-red-100 text-red-600",
  Paid: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
};

const Payments = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 font-inter bg-gray-100 text-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-semibold">Payments</h2>
        <button className="bg-orange-500 text-white font-medium px-4 py-2 rounded hover:bg-orange-600">
          Upload payment
        </button>
      </div>

      {/* Transaction History Tabs */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold">Transaction History</h4>
        <div className="flex gap-4 mt-3 flex-wrap">
          <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm font-medium">
            All payments <span className="ml-2 bg-orange-100 px-2 py-0.5 rounded-full text-xs">4</span>
          </button>
          <button className="bg-white border border-gray-300 px-4 py-1 rounded text-sm font-medium">
            Upcoming payments <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">4</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-6">
        <input
          type="text"
          placeholder="Search transactions"
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded"
        />
        <select className="px-4 py-2 border border-gray-300 rounded">
          <option>All transactions</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded">
          <option>All dates</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded">
          <option>All status</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Serial number</th>
              <th className="text-left px-4 py-3">Payment type</th>
              <th className="text-left px-4 py-3">Property address</th>
              <th className="text-left px-4 py-3">Payment Date</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Verification status</th>
              <th className="text-left px-4 py-3">Payment status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className="border-b text-sm">
                <td className="px-4 py-3">{tx.serial}</td>
                <td className="px-4 py-3 text-orange-500 font-medium">{tx.type}</td>
                <td className="px-4 py-3">{tx.address}</td>
                <td className="px-4 py-3">{tx.date}</td>
                <td className="px-4 py-3">{tx.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${badgeStyle[tx.verification]}`}
                  >
                    {tx.verification}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${badgeStyle[tx.payment]}`}
                  >
                    {tx.payment}
                  </span>
                </td>
                <td className="px-4 py-3 relative">
                  <div className="group inline-block">
                    <button className="text-xl px-2">⋯</button>
                    <div className="absolute right-0 hidden group-hover:block bg-white border border-gray-200 rounded shadow z-10 mt-2 w-48">
                      <ul className="text-sm">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Verify transaction</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit transaction details</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete transaction</li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm">
        <label>
          Show:
          <select className="ml-2 border px-2 py-1 rounded">
            <option>5 rows</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Payments;
