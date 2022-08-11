import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  number: "",
  submitOTPtxnId: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
};

const aadhaarSlice = createSlice({
  name: "aadhaar",
  initialState: initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addSubmitOTPtxnId(state, action) {
      state.submitOTPtxnId = action.payload;
    },
    addVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetAadhaar(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addData,
  addNumber,
  addSubmitOTPtxnId,
  addVerifyMsg,
  addVerifyStatus,
  resetAadhaar,
} = aadhaarSlice.actions;

export default aadhaarSlice.reducer;
