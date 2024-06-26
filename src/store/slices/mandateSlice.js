import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  verifyMsg: "",
  verifyStatus: "",
  verifyTimestamp: "",
  active: null,
};

const mandateSlice = createSlice({
  name: "mandate",
  initialState: initialState,
  reducers: {
    addActive(state, action) {
      state.active = action.payload;
    },
    addData(state, action) {
      state.data = action.payload;
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
    resetMandate(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const {
  addActive,
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  resetMandate,
} = mandateSlice.actions;

export default mandateSlice.reducer;
