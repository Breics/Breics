import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutTenant } from '../redux/slices/tenantAuthSlice';
import { FaTicketAlt, FaQuestionCircle, FaClipboardList, FaCheckCircle, FaHome, FaBell, FaUser, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';

// User dropdown component with logout, edit profile, and settings options
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
        className="flex items-center space-x-2 focus:outline-none hover:bg-gray-50 rounded-full py-1 px-2 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 border border-orange-200">
          {user?.profilePhoto?.url ? (
            <img 
              src={user.profilePhoto.url} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUser className="h-4 w-4" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
        <span className="text-xs ml-1">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <button
            onClick={() => {
              navigate('/tenant/profile');
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FaUserEdit className="mr-3 text-gray-500" />
            Edit Profile
          </button>
          
          <button
            onClick={() => {
              navigate('/tenant/settings');
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <svg className="mr-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Settings
          </button>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const TenantLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.tenantAuth);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set current path for active tab highlighting
    setCurrentPath(window.location.pathname);
    
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
    navigate('/');
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed at the top */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/tenant/dashboard" className="text-2xl font-bold text-orange-500">BREICS</Link>
          <div className="flex items-center space-x-4">
            {/* Status indicator - changes color based on verification status */}
            <div className={`${user.profileStatus === 'Verified' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-md flex items-center`}>
              <span className="mr-1">{user.profileStatus === 'Verified' ? 'Verified' : 'PendingAdminReview'}</span>
              <span className="h-2 w-2 bg-white rounded-full"></span>
            </div>
            
            {/* Notification bell */}
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700">
                <FaBell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
              </button>
            </div>
            
            {/* User profile dropdown */}
            <UserDropdown user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Fixed below header - no gap between header and nav */}
      <nav className="bg-white fixed top-[56px] left-0 right-0 z-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link 
              to="/tenant/dashboard" 
              className={`${currentPath === '/tenant/dashboard' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'} px-3 py-4 text-sm font-medium flex items-center`}
            >
              <span className="mr-1">🏠</span> Dashboard
            </Link>
            <Link 
              to="/tenant/facility" 
              className={`${currentPath === '/tenant/facility' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'} px-3 py-4 text-sm font-medium flex items-center`}
            >
              <span className="mr-1">🏢</span> Facility
            </Link>
            <Link 
              to="/tenant/payment" 
              className={`${currentPath === '/tenant/payment' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'} px-3 py-4 text-sm font-medium flex items-center`}
            >
              <span className="mr-1">💰</span> Payment
            </Link>
            <Link 
              to="/tenant/document" 
              className={`${currentPath === '/tenant/document' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'} px-3 py-4 text-sm font-medium flex items-center`}
            >
              <span className="mr-1">📄</span> Document
            </Link>
            <Link 
              to="/tenant/profile" 
              className={`${currentPath === '/tenant/profile' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'} px-3 py-4 text-sm font-medium flex items-center`}
            >
              <span className="mr-1">👤</span> Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Adjusted padding to account for fixed header and nav */}
      <main className="flex-grow pt-[104px]">
        <Outlet />
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

export default TenantLayout;
