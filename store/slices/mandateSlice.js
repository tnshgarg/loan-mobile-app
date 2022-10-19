import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { type: "" },
  customerId: "",
  orderId: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
  verifyTimestamp: "",
};

const mandateSlice = createSlice({
  name: "mandate",
  initialState: initialState,
  reducers: {
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
    addType(state, action) {
      state.data.type = action.payload;
    },
    addCustomerId(state, action) {
      state.data.customerId = action.payload;
    },
    addOrderId(state, action) {
      state.orderId = action.payload;
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
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  addType,
  addOrderId,
  addCustomerId,
  resetMandate,
} = mandateSlice.actions;

export default mandateSlice.reducer;
