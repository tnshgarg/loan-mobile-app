import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    branchCity: "",
    ifsc: "",
    upi: "",
  },
  verifyMsg: "",
  verifyStatus: "PENDING",
  verifyTimestamp: "",
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    addAccountHolderName(state, action) {
      state.data.accountHolderName = action.payload;
    },
    addAccountNumber(state, action) {
      state.data.accountNumber = action.payload;
    },
    addBankName(state, action) {
      state.data.bankName = action.payload;
    },
    addBranchName(state, action) {
      state.data.branchName = action.payload;
    },
    addBranchCity(state, action) {
      state.data.branchCity = action.payload;
    },
    addIfsc(state, action) {
      state.data.ifsc = action.payload;
    },
    addUpi(state, action) {
      state.data.upi = action.payload;
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
    resetBank(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addAccountHolderName,
  addAccountNumber,
  addBankName,
  addBranchName,
  addBranchCity,
  addIfsc,
  addUpi,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  resetBank,
} = bankSlice.actions;
export default bankSlice.reducer;
