import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaHome } from 'react-icons/fa';

const GetStartedModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Handles routing and closes modal
  const handleRoute = (path) => {
    onClose(); // Close modal first
    setTimeout(() => navigate(path), 100); // Short delay ensures modal disappears smoothly
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-md transform transition-all duration-300 scale-100 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Get Started As</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRoute('/login')}
            className="flex items-center justify-between px-4 py-3 rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            <span className="flex items-center gap-3 font-semibold">
              <FaUserTie size={20} />
              Landlord / Manager
            </span>
            <span className="text-xs text-gray-500">List a property</span>
          </button>

          <button
            onClick={() => handleRoute('/signup/tenant')}
            className="flex items-center justify-between px-4 py-3 rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            <span className="flex items-center gap-3 font-semibold">
              <FaHome size={20} />
              Tenant / Renter
            </span>
            <span className="text-xs text-gray-500">Find a property</span>
          </button>
        </div>

        <button
          className="mt-6 text-sm text-gray-500 hover:text-orange-500 text-center block mx-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GetStartedModal;
