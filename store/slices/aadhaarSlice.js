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
    addSubmitOTPtxnId(state, action) {
      state.submitOTPtxnId = action.payload;
    },
    addOCRData(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontData = action.payload.data;
          break;

        case "AADHAAR_BACK":
          state.backData = action.payload.data;
          break;
      }
    },
    addImage(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontImg = action.payload.data;
          break;
        case "AADHAAR_BACK":
          state.backImg = action.payload.data;
          break;
      }
    },
    defaultImage(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontImg = aadhaarFrontPlaceholder;
          break;
        case "AADHAAR_BACK":
          state.backImg = aadhaarBackPlaceholder;
          break;
      }
    },
    addData(state, action) {
      state.data = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyStatus(state, action) {
      switch (action.payload.type) {
        case "OTP":
          state.verifyStatus.OTP = action.payload.status;
          break;
        case "OCR":
          state.verifyStatus.OCR = action.payload.status;
          break;
      }
    },
  },
});

export const {
  addSubmitOTPtxnId,
  addOCRData,
  addData,
  addNumber,
  addVerifyStatus,
  addImage,
  defaultImage,
} = aadhaarSlice.actions;
export default aadhaarSlice.reducer;
