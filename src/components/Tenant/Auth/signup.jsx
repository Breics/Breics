import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { registerTenant, reset } from '../redux/slices/tenantAuthSlice';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tenantAuth
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
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
    
    // Clear password error when user types in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setPasswordError('');
    setFormError('');
    
    // Validate required fields
    if (!formData.firstName.trim()) {
      setFormError('First name is required');
      return;
    }
    
    if (!formData.lastName.trim()) {
      setFormError('Last name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate password strength - must match backend requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)');
      return;
    }
    
    // Validate phone number format (simple validation)
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError('Please enter a valid phone number (10-15 digits)');
      return;
    }

    // Format phone number to ensure it meets backend requirements
    // Remove any non-digit characters except for leading +
    const formattedPhone = formData.phone.startsWith('+') 
      ? '+' + formData.phone.substring(1).replace(/\D/g, '')
      : formData.phone.replace(/\D/g, '');

    const userData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword, // Add confirmPassword field for backend validation
      phoneNumber: formattedPhone
      // Let the backend set the default profileStatus
    };
    
    console.log('Submitting registration data:', { ...userData, password: '[REDACTED]' });
    dispatch(registerTenant(userData));
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
          <Link to="/tenant/login" className="w-1/2 py-4 text-center text-gray-600 hover:text-gray-800">
            Login
          </Link>
          <div className="w-1/2 py-4 text-center border-b-2 border-orange-500 text-gray-800 font-medium">
            Register
          </div>
        </div>

        {/* Error and Success Messages */}
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{formError}</span>
          </div>
        )}
        {passwordError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{passwordError}</span>
          </div>
        )}
        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">Registration successful! Please check your email to verify your account.</span>
          </div>
        )}
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-bold mb-1 text-center">Register on Breics</h2>
          <p className="text-gray-500 mb-4 text-sm text-center">You are a step away from home</p>
          
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Phone number */}
            <div className="mb-3">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Phone Number"
                required
              />
            </div>

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
            <div className="mb-3">
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
              <p className="text-xs text-gray-500 mt-1">
                Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (!@#$%^&*).
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-gray-400" />
                  ) : (
                    <FaEye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
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
            ) : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;