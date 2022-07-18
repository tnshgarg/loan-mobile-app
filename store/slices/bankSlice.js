import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: "",
  ifsc: "",
  upiId: "",
  accountHolderName: "",
  verifyStatus: "PENDING",
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    addAccountNumber(state, action) {
      state.accountNumber = action.payload;
    },
    addAccountHolderName(state, action) {
      state.accountHolderName = action.payload
    },
    addIfsc(state, action) {
      state.ifsc = action.payload;
    },
    addUpiId(state, action) {
      state.upiId = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const {
  addAccountNumber,
  addAccountHolderName,
  addIfsc,
  addUpiId,
  addVerifyStatus,
} = bankSlice.actions;
export default bankSlice.reducer;
