import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tenantProfileService from '../../api/tenantProfileService';

// Initial state
const initialState = {
  profileData: null,
  verificationStatus: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Complete profile (Phase 2 registration)
export const completeProfile = createAsyncThunk(
  'tenantProfile/complete',
  async (profileData, thunkAPI) => {
    try {
      const response = await tenantProfileService.completeProfile(profileData);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Profile completion failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get tenant profile
export const getProfile = createAsyncThunk(
  'tenantProfile/get',
  async (_, thunkAPI) => {
    try {
      const response = await tenantProfileService.getProfile();
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update tenant profile
export const updateProfile = createAsyncThunk(
  'tenantProfile/update',
  async (profileData, thunkAPI) => {
    try {
      const response = await tenantProfileService.updateProfile(profileData);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload profile documents
export const uploadDocuments = createAsyncThunk(
  'tenantProfile/uploadDocuments',
  async (formData, thunkAPI) => {
    try {
      const response = await tenantProfileService.uploadDocuments(formData);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Document upload failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get verification status
export const getVerificationStatus = createAsyncThunk(
  'tenantProfile/verificationStatus',
  async (_, thunkAPI) => {
    try {
      const response = await tenantProfileService.getVerificationStatus();
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch verification status';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Tenant profile slice
export const tenantProfileSlice = createSlice({
  name: 'tenantProfile',
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
      // Complete profile cases
      .addCase(completeProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profileData = action.payload.profile;
        // Update the user in localStorage with the new profile status
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          user.profileStatus = 'PendingAdminReview';
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .addCase(completeProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Get profile cases
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profileData = action.payload.profile;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profileData = action.payload.profile;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Upload documents cases
      .addCase(uploadDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update profile data with new document information if returned
        if (action.payload.profile) {
          state.profileData = action.payload.profile;
        }
      })
      .addCase(uploadDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Get verification status cases
      .addCase(getVerificationStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVerificationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verificationStatus = action.payload.status;
        
        // Update the user in localStorage with the new profile status
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && action.payload.profileStatus) {
          user.profileStatus = action.payload.profileStatus;
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .addCase(getVerificationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tenantProfileSlice.actions;
export default tenantProfileSlice.reducer;
