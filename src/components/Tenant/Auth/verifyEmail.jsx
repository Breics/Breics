import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendVerification, reset } from '../redux/slices/tenantAuthSlice';
import { FaCheckCircle, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';

const VerifyEmailPage = () => {
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tenantAuth
  );

  // Extract token from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    if (token) {
      console.log('Verifying email with token:', token);
      dispatch(verifyEmail(token));
    } else {
      console.log('No token found in URL');
    }
    
    // Clean up on unmount
    return () => {
      dispatch(reset());
    };
  }, [location, dispatch]);

  // Effect to handle verification success
  useEffect(() => {
    if (isSuccess) {
      console.log('Email verification successful');
      // Always redirect to login page after successful verification
      // The user will then be required to log in and will be redirected to complete profile
      setTimeout(() => {
        navigate('/tenant/login');
      }, 3000);
    }
  }, [isSuccess, navigate]);

  // Handle countdown for resend button
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResendEmail = () => {
    if (resendCooldown > 0 || !user?.email) return;
    
    dispatch(resendVerification(user.email));
    
    // Start cooldown
    setResendCooldown(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url('/src/image/background.jpg')` }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Email Verification</h1>
          <button
            onClick={() => navigate('/tenant/login')}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
        
        {isLoading && (
          <div className="text-center mb-6">
            <p className="text-gray-600">Verifying your email...</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          </div>
        )}
        
        {isSuccess && user?.isEmailVerified && (
          <div className="p-4 mb-6 rounded bg-green-100 text-green-700">
            <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
            <p className="text-center">Email verified successfully! Redirecting to dashboard...</p>
          </div>
        )}
        
        {isError && (
          <div className="p-4 mb-6 rounded bg-red-100 text-red-700">
            <FaExclamationTriangle className="text-red-500 text-3xl mx-auto mb-2" />
            <p className="text-center">{message}</p>
            <div className="mt-4">
              <button
                onClick={handleResendEmail}
                disabled={resendCooldown > 0}
                className={`w-full py-2 rounded-md transition ${
                  resendCooldown > 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {resendCooldown > 0 ? `Try again in ${resendCooldown}s` : 'Try Again'}
              </button>
            </div>
          </div>
        )}
        
        {!isLoading && !isSuccess && !isError && (
          <>
            <FaEnvelope className="text-orange-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h2>
            <p className="text-gray-600 mb-6 text-center">
              We've sent a verification email to your registered email address. Please check your inbox and click the verification link.
            </p>
            <div className="mb-6">
              <button
                onClick={handleResendEmail}
                disabled={resendCooldown > 0 || !user?.email}
                className={`w-full py-3 rounded-md transition ${
                  resendCooldown > 0 || !user?.email
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Verification Email'}
              </button>
            </div>
            <div className="text-center">
              <Link to="/tenant/login" className="text-orange-500 hover:text-orange-600 text-sm">
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
