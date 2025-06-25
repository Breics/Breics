import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTicketAlt, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { tenantTicketService } from '../api/tenantApiService';

const TenantFacility = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const response = await tenantTicketService.getTickets();
        setTickets(response.data.data);
        setFilteredTickets(response.data.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to load tickets. Please try again later.');
        toast.error('Failed to load tickets. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Filter tickets based on search query and filters
  useEffect(() => {
    let result = [...tickets];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ticket => 
        ticket.title.toLowerCase().includes(query) || 
        ticket.description.toLowerCase().includes(query) ||
        ticket.category.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(ticket => ticket.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'All') {
      result = result.filter(ticket => ticket.category === categoryFilter);
    }

    // Apply date filter
    if (dateFilter !== 'All') {
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = 7 * oneDay;
      const oneMonth = 30 * oneDay;

      result = result.filter(ticket => {
        const createdAt = new Date(ticket.createdAt);
        const diff = now - createdAt;

        switch (dateFilter) {
          case 'Today':
            return diff < oneDay;
          case 'This Week':
            return diff < oneWeek;
          case 'This Month':
            return diff < oneMonth;
          default:
            return true;
        }
      });
    }

    setFilteredTickets(result);
  }, [searchQuery, statusFilter, dateFilter, categoryFilter, tickets]);

  // Handle escalate button click
  const handleEscalate = () => {
    navigate('/tenant/escalate');
  };
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:mt-32">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Tickets</h1>
          <button
            onClick={handleEscalate}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Escalate Issue
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search tickets"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-3 w-full md:w-auto">
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All tickets</option>
              <option value="Open">Open tickets</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed tickets</option>
            </select>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="All">All dates</option>
              <option value="Today">Today</option>
              <option value="This Week">This week</option>
              <option value="This Month">This month</option>
            </select>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All categories</option>
              <option value="Wiring">Wiring</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Heating">Heating</option>
              <option value="Cooling">Cooling</option>
              <option value="Appliances">Appliances</option>
              <option value="Structural">Structural</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Loading, error, empty state, or tickets list */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="text-orange-500 text-4xl animate-spin mb-4" />
            <p className="text-gray-500">Loading tickets...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaExclamationCircle className="text-red-500 text-4xl mb-4" />
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaTicketAlt className="text-gray-300 text-6xl mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No tickets found</h3>
            <p className="text-gray-400 mb-6">
              {tickets.length === 0 ? "You haven't created any tickets yet" : "No tickets match your search criteria"}
            </p>
            <button
              onClick={handleEscalate}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Escalate Issue
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket._id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/tenant/tickets/${ticket._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(ticket.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantFacility;
