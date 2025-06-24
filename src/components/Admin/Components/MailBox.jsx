import React, { useState } from "react";
import {
  FiSearch,
  FiHome,
  FiTrash2,
  FiSend,
  FiMoreVertical,
} from "react-icons/fi";
import axios from "axios";

const messages = [
  { sender: "Afolabi badmus", subject: "Subscription renewal", date: "01/09/2021" },
  { sender: "Adeleke", subject: "Ticket submission", date: "01/09/2021" },
  { sender: "Shehu Omotosho", subject: "Ticket submission", date: "01/09/2021" },
  { sender: "Yomi Oke", subject: "Ticket submission", date: "01/09/2021" },
  { sender: "Akorede Adeleke", subject: "Ticket submission", date: "01/09/2021" },
];

export default function Mailbox() {
  const [activeTab, setActiveTab] = useState("sent");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://breics-backend.onrender.com/api/messages/send",
        {
          to: form.to,
          subject: form.subject,
          body: form.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Message sent successfully!");
      setForm({ to: "", subject: "", message: "" });
      setIsComposeOpen(false);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb & Header */}
      <div className="text-sm text-gray-500">Dashboard &gt; Administration &gt; Tenants</div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Mailbox</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
          onClick={() => setIsComposeOpen(true)}
        >
          Compose mail
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2 text-gray-600 text-sm">
        {["inbox", "sent", "trash"].map((tab) => (
          <button
            key={tab}
            className={`flex items-center gap-1 pb-2 capitalize ${
              activeTab === tab
                ? "text-orange-500 border-b-2 border-orange-500"
                : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "inbox" && <FiHome />}
            {tab === "sent" && <FiSend />}
            {tab === "trash" && <FiTrash2 />}
            {tab}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<FiHome />} count={36} label="Unread" color="orange" />
        <StatCard icon={<FiSend />} count={29} label="Sent" color="green" />
        <StatCard icon={<FiTrash2 />} count={7} label="Trash" color="red" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center bg-white border rounded px-3 py-2 w-full sm:w-1/2 md:w-1/3">
          <input
            type="text"
            placeholder="Search inbox"
            className="outline-none w-full text-sm"
          />
          <FiSearch className="text-gray-400 ml-2" />
        </div>
        <select className="border rounded px-3 py-2 text-sm bg-white">
          <option>All inbox</option>
        </select>
        <select className="border rounded px-3 py-2 text-sm bg-white">
          <option>All dates</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full mt-4 bg-white rounded shadow text-sm text-gray-700">
          <thead className="bg-orange-50 text-gray-500 text-left">
            <tr>
              <th className="p-3">Sender</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Inspection date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-3">{msg.sender}</td>
                <td className="p-3 text-orange-500">{msg.subject}</td>
                <td className="p-3">{msg.date}</td>
                <td className="p-3">
                  <FiMoreVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 text-sm mt-6">
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Prev</button>
        <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">2</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">3</button>
        <span>...</span>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">12</button>
        <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Next</button>
      </div>

      {/* Alerts */}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Compose Mail</h2>

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <input
                  type="email"
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
                  placeholder="Recipient email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
                  placeholder="Message subject"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
                  onClick={() => setIsComposeOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
                  } text-white px-4 py-2 rounded`}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>

            {/* Close button */}
            <button
              onClick={() => setIsComposeOpen(false)}
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

function StatCard({ icon, count, label, color }) {
  const colors = {
    orange: "text-orange-400",
    green: "text-green-400",
    red: "text-red-400",
  };
  return (
    <div className="flex items-center bg-white p-4 rounded shadow">
      <div className={`${colors[color]} text-2xl`}>{icon}</div>
      <div className="ml-3">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-xl font-semibold text-gray-700">{count}</p>
      </div>
    </div>
  );
}
