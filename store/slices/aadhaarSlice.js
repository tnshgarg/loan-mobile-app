import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submitOTPtxnId: null,
  frontData: null,
  backData: null,
  number: null,
  data: null,
  verifyStatus: null,
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

        case "AADHAAR_BACK":
          state.backData = action.payload.data;
      }
    },
    addData(state, action) {
      state.data = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const {
  addSubmitOTPtxnId,
  addOCRData,
  addData,
  addNumber,
  addVerifyStatus,
} = aadhaarSlice.actions;
export default aadhaarSlice.reducer;
