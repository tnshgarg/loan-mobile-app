import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: "",
  ifsc: "",
  upi: "t",
  accountHolderName: "",
  verifyStatus: "PENDING",
  verifyMsg: "",
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    addBankAccountNumber(state, action) {
      state.accountNumber = action.payload;
    },
    addBankAccountHolderName(state, action) {
      state.accountHolderName = action.payload;
    },
    addBankIfsc(state, action) {
      state.ifsc = action.payload;
    },
    addBankUpi(state, action) {
      state.upi = action.payload;
    },
    addBankVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addBankVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    resetBank(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addBankAccountHolderName,
  addBankAccountNumber,
  addBankIfsc,
  addBankUpi,
  addBankVerifyStatus,
  addBankVerifyMsg,
  resetBank,
} = bankSlice.actions;
export default bankSlice.reducer;
