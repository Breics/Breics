import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginTenant, reset } from '../redux/slices/tenantAuthSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tenantAuth
  );
  
  useEffect(() => {
    if (isSuccess && user) {
      // Redirect based on verification and profile status
      if (!user.isEmailVerified) {
        // If email is not verified, redirect to verification page
        navigate('/verify-email');
      } else if (user.profileStatus === 'EmailVerified' || user.profileStatus === 'NotVerified') {
        // If email is verified but profile is not completed, redirect to profile completion
        navigate('/tenant/complete-profile');
      } else {
        // If profile is already completed (PendingAdminReview, Verified, etc.), redirect to dashboard
        // This ensures profile completion is a one-time process
        navigate('/tenant/dashboard');
      }
    }
    
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      email: formData.email,
      password: formData.password
    };
    
    dispatch(loginTenant(userData));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="bg-white rounded-lg w-full max-w-sm relative shadow-2xl mx-auto p-4">
        {/* Close button */}
        <button 
          type="button" 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => navigate('/')}
        >
          <span className="text-xl">&times;</span>
        </button>
        
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <div className="w-1/2 py-4 text-center border-b-2 border-orange-500 text-gray-800 font-medium">
            Login
          </div>
          <Link to="/tenant/signup" className="w-1/2 py-4 text-center text-gray-600 hover:text-gray-800">
            Register
          </Link>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-bold mb-1 text-center">Login to Breics</h2>
          <p className="text-gray-500 mb-4 text-sm text-center">Welcome back to your home</p>
          
          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link to="/forgot-password" className="text-xs text-orange-500 hover:text-orange-600">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 text-sm font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Login'}
          </button>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link to="/tenant/signup" className="text-orange-500 hover:text-orange-600">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;