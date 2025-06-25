import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTicketAlt, FaQuestionCircle, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const TenantDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.tenantAuth);

  if (!user) {
    return null; // Don't render anything if user is not available
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-6">
        {/* Greeting Section */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Tenant's View</p>
          <h2 className="text-lg font-medium">Hi, {user.firstName || 'Innocent'}</h2>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <span className="block text-3xl font-bold">0</span>
              <span className="text-xs text-gray-500">Opened Tickets</span>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <FaTicketAlt />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <span className="block text-3xl font-bold">0</span>
              <span className="text-xs text-gray-500">Opened Queries</span>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">
              <FaQuestionCircle />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <span className="block text-3xl font-bold">0</span>
              <span className="text-xs text-gray-500">Assigned Tickets</span>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              <FaClipboardList />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <span className="block text-3xl font-bold">0</span>
              <span className="text-xs text-gray-500">Closed Tickets</span>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Rentals Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-6">Active Rentals</h3>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">You have no active rentals</p>
              <button 
                onClick={() => navigate('/find-property')} 
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Find Home
              </button>
            </div>
          </div>
          
          {/* Facility Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-6">Facility Management</h3>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">You have no active rentals</p>
              <button 
                onClick={() => navigate('/find-property')} 
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Find Home
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default TenantDashboard;
