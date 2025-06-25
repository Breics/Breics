import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMoreVertical } from 'react-icons/fi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ balance: 0, payouts: 0, nextPayout: 0 });
  const [activeTab, setActiveTab] = useState('history');
  const [actionDropdown, setActionDropdown] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('https://breics-backend.onrender.com/api/transactions');
      setTransactions(res.data.transactions);
      setSummary(res.data.summary);
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    await axios.patch(`https://breics-backend.onrender.com/api/transactions/${id}/verify`);
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://breics-backend.onrender.com/api/transactions/${id}`);
    fetchTransactions();
  };

  const revenueData = [
    { name: 'Paid', value: transactions.filter(tx => tx.status === 'Paid').length },
    { name: 'Pending', value: transactions.filter(tx => tx.status !== 'Paid').length }
  ];

  const COLORS = ['#34D399', '#FBBF24'];

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Available Balance</p>
          <h3 className="text-lg font-bold">₦{Number(summary.balance).toLocaleString()}</h3>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Previous payouts</p>
          <h3 className="text-lg font-bold text-green-600">₦{Number(summary.payouts).toLocaleString()}</h3>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Next payout</p>
          <h3 className="text-lg font-bold text-orange-600">₦{Number(summary.nextPayout).toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab('history')}
              className={`text-sm font-medium px-3 py-1 rounded ${activeTab === 'history' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'}`}
            >
              Transaction History
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`text-sm font-medium px-3 py-1 rounded ${activeTab === 'revenue' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'}`}
            >
              Revenue
            </button>
          </div>
          <button className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">
            Upload payment
          </button>
        </div>

        {activeTab === 'history' && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="p-3">Serial #</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="p-4 text-center" colSpan="8">Loading...</td></tr>
                ) : transactions.length === 0 ? (
                  <tr><td className="p-4 text-center" colSpan="8">No transactions found</td></tr>
                ) : (
                  transactions.map((tx, i) => (
                    <tr key={tx._id} className="border-t hover:bg-gray-50 relative">
                      <td className="p-3">{tx.serialNumber || `PR-2021-0${i + 1}`}</td>
                      <td className="p-3 text-orange-500">{tx.type}</td>
                      <td className="p-3">{tx.propertyAddress}</td>
                      <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="p-3 font-medium">₦{Number(tx.amount).toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${tx.verified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {tx.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3 relative">
                        <button onClick={() => setActionDropdown(tx._id)}>
                          <FiMoreVertical />
                        </button>
                        {actionDropdown === tx._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded z-10">
                            <button onClick={() => handleVerify(tx._id)} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Verify</button>
                            <button onClick={() => alert('Edit logic here')} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Edit</button>
                            <button onClick={() => handleDelete(tx._id)} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="p-6 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {revenueData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
