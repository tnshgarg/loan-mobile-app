import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import imageSlice from "./slices/imageSlice";
import aadhaarSlice from "./slices/aadhaarSlice";
import panSlice from "./slices/panSlice";
import bankSlice from "./slices/bankSlice";
import esicSlice from "./slices/esicSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    image: imageSlice,
    aadhaar: aadhaarSlice,
    pan: panSlice,
    bank: bankSlice,
    esic: esicSlice,
  },
});
