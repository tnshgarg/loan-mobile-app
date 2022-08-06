import { createSlice } from "@reduxjs/toolkit";
import {
  aadhaarFrontPlaceholder,
  aadhaarBackPlaceholder,
} from "../../helpers/base64";

const initialState = {
  submitOTPtxnId: "",
  frontData: "",
  backData: "",
  number: "",
  data: "",
  verifyStatus: { OCR: "PENDING", OTP: "PENDING" },
  frontImg: aadhaarFrontPlaceholder,
  backImg: aadhaarBackPlaceholder,
};

const aadhaarSlice = createSlice({
  name: "aadhaar",
  initialState: initialState,
  reducers: {
    addAadhaarData(state, action) {
      state.data = action.payload;
    },
    addAadhaarImage(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontImg = action.payload.data;
          break;
        case "AADHAAR_BACK":
          state.backImg = action.payload.data;
          break;
      }
    },
    addAadhaarNumber(state, action) {
      state.number = action.payload;
    },
    addAadhaarOCRData(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontData = action.payload.data;
          break;
        case "AADHAAR_BACK":
          state.backData = action.payload.data;
          break;
      }
    },
    addAadhaarSubmitOTPtxnId(state, action) {
      state.submitOTPtxnId = action.payload;
    },
    addAadhaarVerifyStatus(state, action) {
      switch (action.payload.type) {
        case "OTP":
          state.verifyStatus.OTP = action.payload.status;
          break;
        case "OCR":
          state.verifyStatus.OCR = action.payload.status;
          break;
      }
    },
    setAadhaarPlaceholderImage(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontImg = aadhaarFrontPlaceholder;
          break;
        case "AADHAAR_BACK":
          state.backImg = aadhaarBackPlaceholder;
          break;
      }
    },
    resetAadhaar(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addAadhaarData,
  addAadhaarImage,
  addAadhaarNumber,
  addAadhaarOCRData,
  addAadhaarSubmitOTPtxnId,
  addAadhaarVerifyStatus,
  setAadhaarPlaceholderImage,
  resetAadhaar,
} = aadhaarSlice.actions;

export default aadhaarSlice.reducer;
