// Base API URL configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://breics-backend.onrender.com/api'
  : 'http://localhost:5000/api';

// For debugging - log the base URL being used
console.log('Using Tenant API base URL:', API_BASE_URL);

// Tenant API endpoints
export const TENANT_ENDPOINTS = {
  // Auth
  LOGIN: '/tenants/login',
  SIGNUP: '/tenants/register',
  REFRESH_TOKEN: '/tenants/refresh-token',
  LOGOUT: '/tenants/logout',
  
  // Email Verification
  VERIFY_EMAIL: '/tenants/verify-email/:token', // Updated to match backend route with token parameter
  RESEND_VERIFICATION: '/tenants/resend-verification-email',
  
  // Password Management
  FORGOT_PASSWORD: '/tenants/forgot-password',
  RESET_PASSWORD: '/tenants/reset-password/:token', // Updated to match backend route with token parameter
  CHANGE_PASSWORD: '/tenants/change-password', // Added to match backend route
  
  // Profile
  GET_PROFILE: '/tenants/profile',
  UPDATE_PROFILE: '/tenants/profile', // Updated to match backend PUT route
  COMPLETE_PROFILE: '/tenants/complete-profile', // Special endpoint for profile completion
  UPLOAD_PROFILE_PHOTO: '/tenants/profile/upload-photo', // Added based on backend schema
  VERIFICATION_STATUS: '/tenants/profile/verification-status', // Added for checking verification status
  
  // Preferences
  UPDATE_PREFERENCES: '/tenants/preferences', // Added to match backend route
  
  // Applications
  GET_APPLICATIONS: '/tenants/applications',
  GET_APPLICATION: '/tenants/applications/:id',
  CREATE_APPLICATION: '/tenants/applications',
  CANCEL_APPLICATION: '/tenants/applications/:id',
  
  // Properties
  GET_TENANT_PROPERTIES: '/tenants/properties',
  GET_PROPERTY_DETAILS: '/tenants/properties/:id',
  
  // Payments
  GET_PAYMENTS: '/tenants/payments',
  MAKE_PAYMENT: '/tenants/payments',
  GET_PAYMENT_DETAILS: '/tenants/payments/:id',
  
  // Support
  CREATE_SUPPORT_TICKET: '/tenants/support',
  GET_SUPPORT_TICKETS: '/tenants/support',
  GET_SUPPORT_TICKET: '/tenants/support/:id',
  UPDATE_SUPPORT_TICKET: '/tenants/support/:id',
  
  // Google OAuth endpoints removed
};

// Helper function to replace URL parameters
export const getEndpointWithParams = (endpoint, params) => {
  let url = endpoint;
  if (params) {
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
  }
  return url;
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint, params) => {
  const url = getEndpointWithParams(endpoint, params);
  return `${API_BASE_URL}${url}`;
};
