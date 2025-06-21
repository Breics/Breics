import axios from 'axios';
import { API_BASE_URL, TENANT_ENDPOINTS, buildApiUrl } from './tenantEndpoints';

// Create axios instance with default config
const tenantApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Add this to handle cookies and CORS issues
});

// Request interceptor for adding token
tenantApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
tenantApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            buildApiUrl(TENANT_ENDPOINTS.REFRESH_TOKEN),
            { refreshToken }
          );
          
          const { token } = response.data.data;
          localStorage.setItem('token', token);
          
          // Retry original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return tenantApiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/tenant/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Tenant Authentication API Services
export const tenantAuthService = {
  // Register new tenant
  register: async (userData) => {
    console.log('Registering tenant with endpoint:', TENANT_ENDPOINTS.SIGNUP);
    console.log('API base URL:', API_BASE_URL);
    console.log('Registration data:', { ...userData, password: '[REDACTED]' });
    
    try {
      const response = await tenantApiClient.post(TENANT_ENDPOINTS.SIGNUP, userData);
      console.log('Registration response:', response.data);
      return response;
    } catch (error) {
      console.error('Registration API error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw error;
    }
  },
  
  // Login tenant
  login: (credentials) => {
    console.log('Attempting login with:', credentials.email);
    console.log('Login endpoint:', TENANT_ENDPOINTS.LOGIN);
    console.log('API base URL:', API_BASE_URL);
    return tenantApiClient.post(TENANT_ENDPOINTS.LOGIN, credentials);
  },
  
  // Logout tenant
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  
  // Verify email
  verifyEmail: (token) => {
    return tenantApiClient.get(buildApiUrl(TENANT_ENDPOINTS.VERIFY_EMAIL, { token }));
  },
  
  // Resend verification email
  resendVerification: (email) => {
    return tenantApiClient.post(TENANT_ENDPOINTS.RESEND_VERIFICATION, { email });
  },
  
  // Request password reset
  forgotPassword: (email) => {
    return tenantApiClient.post(TENANT_ENDPOINTS.FORGOT_PASSWORD, { email });
  },
  
  // Reset password with token
  resetPassword: (token, newPassword) => {
    return tenantApiClient.put(buildApiUrl(TENANT_ENDPOINTS.RESET_PASSWORD, { token }), {
      newPassword
    });
  },
  
  // Change password (when logged in)
  changePassword: (currentPassword, newPassword) => {
    return tenantApiClient.put(TENANT_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    });
  }
};

// Tenant Profile API Services
export const tenantProfileService = {
  // Get tenant profile
  getProfile: () => {
    return tenantApiClient.get(TENANT_ENDPOINTS.GET_PROFILE);
  },
  
  // Update tenant profile
  updateProfile: (profileData) => {
    return tenantApiClient.put(TENANT_ENDPOINTS.UPDATE_PROFILE, profileData);
  },
  
  // Complete tenant profile (phase 2 registration)
  completeProfile: (profileData) => {
    // Check if profileData is FormData (for file uploads)
    const config = {};
    if (profileData instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data'
      };
    }
    
    // Ensure token is in the headers
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('No authentication token found for profile completion');
    }
    
    // Ensure profileStatus is set to 'PendingAdminReview'
    if (profileData instanceof FormData) {
      profileData.append('profileStatus', 'PendingAdminReview');
    } else {
      profileData.profileStatus = 'PendingAdminReview';
    }
    
    // Log the request for debugging
    console.log('Profile completion request:', {
      endpoint: TENANT_ENDPOINTS.COMPLETE_PROFILE,
      hasToken: !!token,
      contentType: profileData instanceof FormData ? 'multipart/form-data' : 'application/json',
      dataType: typeof profileData
    });
    
    // Use PUT method to our dedicated endpoint
    return tenantApiClient.put(TENANT_ENDPOINTS.COMPLETE_PROFILE, profileData, config);
  },
  
  // Upload profile photo
  uploadProfilePhoto: (formData) => {
    return tenantApiClient.post(TENANT_ENDPOINTS.UPLOAD_PROFILE_PHOTO, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Get verification status
  getVerificationStatus: () => {
    return tenantApiClient.get(TENANT_ENDPOINTS.VERIFICATION_STATUS);
  },
  
  // Update preferences
  updatePreferences: (preferencesData) => {
    return tenantApiClient.put(TENANT_ENDPOINTS.UPDATE_PREFERENCES, preferencesData);
  }
};

// Tenant Applications API Services
export const tenantApplicationService = {
  // Get all applications
  getApplications: () => {
    return tenantApiClient.get(TENANT_ENDPOINTS.GET_APPLICATIONS);
  },
  
  // Get single application
  getApplication: (id) => {
    return tenantApiClient.get(
      buildApiUrl(TENANT_ENDPOINTS.GET_APPLICATION, { id })
    );
  },
  
  // Create application
  createApplication: (applicationData) => {
    return tenantApiClient.post(TENANT_ENDPOINTS.CREATE_APPLICATION, applicationData);
  },
  
  // Cancel application
  cancelApplication: (id) => {
    return tenantApiClient.delete(
      buildApiUrl(TENANT_ENDPOINTS.CANCEL_APPLICATION, { id })
    );
  }
};

// Tenant Properties API Services
export const tenantPropertyService = {
  // Get tenant's properties
  getProperties: () => {
    return tenantApiClient.get(TENANT_ENDPOINTS.GET_TENANT_PROPERTIES);
  },
  
  // Get property details
  getPropertyDetails: (id) => {
    return tenantApiClient.get(
      buildApiUrl(TENANT_ENDPOINTS.GET_PROPERTY_DETAILS, { id })
    );
  }
};

// Tenant Payments API Services
export const tenantPaymentService = {
  // Get all payments
  getPayments: () => {
    return tenantApiClient.get(TENANT_ENDPOINTS.GET_PAYMENTS);
  },
  
  // Make payment
  makePayment: (paymentData) => {
    return tenantApiClient.post(TENANT_ENDPOINTS.MAKE_PAYMENT, paymentData);
  },
  
  // Get payment details
  getPaymentDetails: (id) => {
    return tenantApiClient.get(
      buildApiUrl(TENANT_ENDPOINTS.GET_PAYMENT_DETAILS, { id })
    );
  }
};

// Tenant Support API Services
export const tenantSupportService = {
  // Create support ticket
  createTicket: (ticketData) => {
    return tenantApiClient.post(TENANT_ENDPOINTS.CREATE_SUPPORT_TICKET, ticketData);
  },
  
  // Get all support tickets
  getTickets: () => {
    return tenantApiClient.get(TENANT_ENDPOINTS.GET_SUPPORT_TICKETS);
  },
  
  // Get ticket details
  getTicket: (id) => {
    return tenantApiClient.get(
      buildApiUrl(TENANT_ENDPOINTS.GET_SUPPORT_TICKET, { id })
    );
  },
  
  // Update ticket
  updateTicket: (id, ticketData) => {
    return tenantApiClient.put(
      buildApiUrl(TENANT_ENDPOINTS.UPDATE_SUPPORT_TICKET, { id }),
      ticketData
    );
  }
};
