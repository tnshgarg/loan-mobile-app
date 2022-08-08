import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submitOTPtxnId: "",
  number: "",
  data: "",
  verifyStatus: "PENDING",
};

const aadhaarSlice = createSlice({
  name: "aadhaar",
  initialState: initialState,
  reducers: {
    addAadhaarData(state, action) {
      state.data = action.payload;
    },
    addAadhaarNumber(state, action) {
      state.number = action.payload;
    },
    addAadhaarSubmitOTPtxnId(state, action) {
      state.submitOTPtxnId = action.payload;
    },
    addAadhaarVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetAadhaar(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addAadhaarData,
  addAadhaarNumber,
  addAadhaarSubmitOTPtxnId,
  addAadhaarVerifyStatus,
  resetAadhaar,
} = aadhaarSlice.actions;

export default aadhaarSlice.reducer;
