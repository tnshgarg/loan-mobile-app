import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  number: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
  verifyTimestamp: "",
};

const licenseSlice = createSlice({
  name: "license",
  initialState: initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addVerifyTimestamp(state, action) {
      state.verifyTimestamp = action.payload;
    },
    resetLicense(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const {
  addData,
  addNumber,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  resetLicense,
} = licenseSlice.actions;

export default licenseSlice.reducer;
