import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aadhaarTransactionId: null,
  aadhaarFrontData: null,
  aadhaarBackData: null,
  aadhaar: null,
  aadhaarData: null,
  AadhaarVerifedStatus: null,
};

const aadhaarSlice = createSlice({
  name: "aadhaar",
  initialState: initialState,
  reducers: {
    addAadhaarTransactionId(state, action) {
      state.aadhaarTransactionId = action.payload;
    },
    addAadhaarOCRData(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.aadhaarFrontData = action.payload.data;

        case "AADHAAR_BACK":
          state.aadhaarBackData = action.payload.data;
      }
    },
    addAadhaarData(state, action) {
      state.aadhaarData = action.payload;
    },
    addAadhaar(state, action) {
      state.aadhaar = action.payload;
    },
    addAadhaarVerifedStatus(state, action) {
      state.AadhaarVerifedStatus = action.payload;
    },
  },
});

export const {
  addAadhaar,
  addAadhaarOCRData,
  addAadhaarTransactionId,
  addAadhaarData,
  addAadhaarVerifedStatus,
} = aadhaarSlice.actions;
export default aadhaarSlice.reducer;
