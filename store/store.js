import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import imageSlice from './slices/imageSlice';
import aadhaarSlice from './slices/aadhaarSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    image : imageSlice,
    aadhaar : aadhaarSlice,
  },
})