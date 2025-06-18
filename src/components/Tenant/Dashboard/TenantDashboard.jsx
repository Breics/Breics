import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutTenant } from '../redux/slices/tenantAuthSlice';
import { FaTicketAlt, FaQuestionCircle, FaClipboardList, FaCheckCircle, FaHome, FaBell, FaUser, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';

// User dropdown component with logout and edit profile options
const UserDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center space-x-1 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
          <FaUser className="h-4 w-4" />
        </div>
        <span className="text-sm">{user?.firstName} {user?.lastName}</span>
        <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            onClick={() => {
              navigate('/tenant/profile/edit');
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FaUserEdit className="mr-2" />
            Edit Profile
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const TenantDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.tenantAuth);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user || !token) {
      navigate('/tenant/login');
    }
    
    // Redirect to email verification if not verified
    if (user && !user.isEmailVerified) {
      navigate('/verify-email');
    }
  }, [user, token, navigate]);

  const handleLogout = () => {
    dispatch(logoutTenant());
    navigate('/tenant/login');
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/tenant/dashboard" className="text-2xl font-bold text-orange-500">BREICS</Link>
          <div className="flex items-center space-x-4">
            {/* Status indicator - changes color based on verification status */}
            <div className={`${user.profileStatus === 'Verified' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-md flex items-center`}>
              <span className="mr-1">{user.profileStatus === 'Verified' ? 'Verified' : 'PendingAdminReview'}</span>
              <span className="h-2 w-2 bg-white rounded-full"></span>
            </div>
            
            {/* Notification icon */}
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
            </div>
            
            {/* User profile dropdown */}
            <UserDropdown user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link to="/tenant/dashboard" className="border-b-2 border-orange-500 px-3 py-4 text-sm font-medium text-orange-500 flex items-center">
              <span className="mr-1">🏠</span> Dashboard
            </Link>
            <Link to="/tenant/facility" className="px-3 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
              <span className="mr-1">🏢</span> Facility
            </Link>
            <Link to="/tenant/payment" className="px-3 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
              <span className="mr-1">💰</span> Payment
            </Link>
            <Link to="/tenant/document" className="px-3 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
              <span className="mr-1">📄</span> Document
            </Link>
            <Link to="/tenant/profile" className="px-3 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
              <span className="mr-1">👤</span> Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {/* Greeting Section */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Tenant's View</p>
          <h2 className="text-lg font-medium">Hi, {user.firstName || 'Innocent'}</h2>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
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
        <div className="grid grid-cols-2 gap-6">
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
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-2 sm:mb-0">
            <Link to="/find-property" className="text-xs text-gray-500 hover:text-gray-700">Find a property</Link>
            <Link to="/list-property" className="text-xs text-gray-500 hover:text-gray-700">List a property</Link>
          </div>
          <div className="text-xs text-gray-500">
            <p>© 2025 Breics. All rights reserved.</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <p className="text-xs text-gray-500">Get Support</p>
            <p className="text-xs text-gray-500">info@breics.com</p>
          </div>
        </div>
      </footer>

      {/* Logout button (hidden but functional) */}
      <button 
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600"
        title="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Chat button */}
      <button className="fixed bottom-20 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600">
        <FaQuestionCircle className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TenantDashboard;
