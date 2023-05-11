import { createSlice } from "@reduxjs/toolkit";
import { aadhaarApi } from "../apiSlices/aadhaarApi";

const initialState = {
  data: {},
  number: "",
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
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetAadhaar(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      aadhaarApi.endpoints.verifyAadhaarOtp.matchFulfilled,
      (state, { payload }) => {
        console.log("payload: ", payload);
        state.data = payload?.body?.data;
        state.verifyStatus = payload?.body?.verifyStatus;
      }
    )
  },
});

export const {
  addData,
  addNumber,
  addVerifyStatus,
  resetAadhaar,
} = aadhaarSlice.actions;

export default aadhaarSlice.reducer;
