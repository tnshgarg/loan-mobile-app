import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: "",
  ifsc: "",
  upi: "",
  accountHolderName: "",
  verifyStatus: "PENDING",
  verifyMsg: "",
  bankName: "",
  bankBranch: "",
  branchCity: "",
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
    addBankName(state, action) {
      state.bankName = action.payload;
    },
    addBankBranch(state, action) {
      state.bankBranch = action.payload;
    },
    addBranchCity(state, action) {
      state.branchCity = action.payload;
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
  addBankName,
  addBankBranch,
  addBranchCity,
  resetBank,
} = bankSlice.actions;
export default bankSlice.reducer;
