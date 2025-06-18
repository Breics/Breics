import { configureStore } from '@reduxjs/toolkit';
import tenantAuthReducer from './slices/tenantAuthSlice';
import tenantProfileReducer from './slices/tenantProfileSlice';

export const store = configureStore({
  reducer: {
    tenantAuth: tenantAuthReducer,
    tenantProfile: tenantProfileReducer,
  },
});

export default store;
