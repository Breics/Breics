import React, { useState } from 'react';
import { 
  FaLock, 
  FaShieldAlt, 
  FaBell,
  FaSave,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { tenantAuthService } from '../api/tenantApiService';

const TenantSettings = () => {
  console.log('TenantSettings component rendering - password change version');
  
  const [activeTab, setActiveTab] = useState('password');
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTabChange = (tab) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      await tenantAuthService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword // Pass confirmPassword as confirmNewPassword
      );
      
      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast.success('Password changed successfully!');
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  console.log('Rendering main UI, activeTab:', activeTab);
  return (
    <div className="container mx-auto md:mt-32">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Account Settings</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap mb-6 md:mb-8 border-b overflow-x-auto whitespace-nowrap">
        <button
          className={`flex items-center px-3 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === 'password' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabChange('password')}
        >
          <FaLock className="mr-2" /> Password
        </button>
        <button
          className={`flex items-center px-3 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === 'security' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabChange('security')}
        >
          <FaShieldAlt className="mr-2" /> Security
        </button>
        <button
          className={`flex items-center px-3 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === 'notifications' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabChange('notifications')}
        >
          <FaBell className="mr-2" /> Notifications
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : activeTab === 'password' ? (
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full max-w-md mx-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Change Password</h2>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">Update your password to keep your account secure.</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    minLength="8"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                type="submit" 
                className="flex items-center px-4 md:px-6 py-2 md:py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full justify-center text-sm md:text-base"
                disabled={loading}
              >
                <FaSave className="mr-2" /> Update Password
              </button>
            </div>
          </form>
        ) : activeTab === 'security' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <p className="text-gray-600">Security settings coming soon...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <p className="text-gray-600">Notification settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantSettings;
