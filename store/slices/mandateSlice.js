import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  number: "",
  deviceIp: "",
  deviceId: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
  verifyTimestamp: "",
  type: "",
};

const mandateSlice = createSlice({
  name: "mandate",
  initialState: initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
    addDeviceId(state, action) {
      state.deviceId = action.payload;
    },
    addDeviceIp(state, action) {
      state.deviceIp = action.payload;
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
    addType(state, action) {
      state.type = action.payload;
    },
    resetMandate(state, action) {
      if (!action.payload) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const {
  addData,
  addDeviceId,
  addDeviceIp,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  addType,
  resetMandate,
} = mandateSlice.actions;

export default mandateSlice.reducer;
