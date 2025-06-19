import React, { useEffect, useState } from 'react';

export default function SupportDashboard() {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    description: '',
    createdBy: '',
    createdRole: 'User',
    status: 'Open',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST ticket to backend
    fetch('http://localhost:5000/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    })
      .then(res => res.json())
      .then((data) => {
        setTickets((prev) => [...prev, data]);
        setShowModal(false);
        setNewTicket({
          title: '',
          category: '',
          description: '',
          createdBy: '',
          createdRole: 'User',
          status: 'Open',
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold mb-2">Get Support</h4>
          <p>support@breics.com</p>
          <p>+2349017668909</p>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold mb-2">Raise Ticket</h4>
          <p>Create a support ticket</p>
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            onClick={() => setShowModal(true)}
          >
            Create Ticket →
          </button>
        </div>
      </div>

      {/* ...Table remains the same here... */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-md w-full max-w-md p-6 relative shadow-lg">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Raise New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <textarea
                placeholder="Description"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
                required
              ></textarea>
              <input
                type="text"
                placeholder="Your name"
                value={newTicket.createdBy}
                onChange={(e) => setNewTicket({ ...newTicket, createdBy: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 w-full text-white py-2 rounded-md hover:bg-orange-600 transition"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
