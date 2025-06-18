import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tenantAuthService } from '../../api/tenantApiService';

// Get user from localStorage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const token = localStorage.getItem('token') || null;

// Register tenant
export const registerTenant = createAsyncThunk(
  'tenantAuth/register',
  async (userData, thunkAPI) => {
    try {
      console.log('Attempting to register tenant with data:', { ...userData, password: '[REDACTED]' });
      const response = await tenantAuthService.register(userData);
      
      console.log('Registration successful, response:', response.data);
      
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.tenant));
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Registration error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      let message = 'Registration failed';
      
      // Handle various error response formats
      if (error.response?.data) {
        if (error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response.data.error) {
          message = error.response.data.error;
        } else if (error.response.data.errors) {
          // Join all validation errors
          const errorMessages = [];
          const errors = error.response.data.errors;
          
          if (Array.isArray(errors)) {
            message = errors.join(', ');
          } else if (typeof errors === 'object') {
            Object.values(errors).forEach(err => {
              errorMessages.push(err);
            });
            message = errorMessages.join(', ');
          }
        }
      } else if (error.message) {
        message = error.message;
      }
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login tenant
export const loginTenant = createAsyncThunk(
  'tenantAuth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await tenantAuthService.login(userData);
      console.log('Login response:', response.data); // Debug log
      
      // Handle different response structures
      const data = response.data.data || response.data;
      
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken || ''); // Store refresh token if available
        localStorage.setItem('user', JSON.stringify(data.tenant || data.user || data));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout tenant
export const logoutTenant = createAsyncThunk('tenantAuth/logout', async () => {
  await tenantAuthService.logout();
  return null;
});

const initialState = {
  user: user,
  token: token,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Verify email
export const verifyEmail = createAsyncThunk(
  'tenantAuth/verifyEmail',
  async (token, thunkAPI) => {
    try {
      const response = await tenantAuthService.verifyEmail(token);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Email verification failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Resend verification email
export const resendVerification = createAsyncThunk(
  'tenantAuth/resendVerification',
  async (email, thunkAPI) => {
    try {
      const response = await tenantAuthService.resendVerification(email);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend verification email';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tenantAuthSlice = createSlice({
  name: 'tenantAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerTenant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.tenant;
        state.token = action.payload.token;
      })
      .addCase(registerTenant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      // Login cases
      .addCase(loginTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginTenant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.tenant;
        state.token = action.payload.token;
      })
      .addCase(loginTenant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      // Logout case
      .addCase(logoutTenant.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      // Email verification cases
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user) {
          state.user.isEmailVerified = true;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Resend verification email cases
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tenantAuthSlice.actions;
export default tenantAuthSlice.reducer;
