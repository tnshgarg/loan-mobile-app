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
  verifyStatus: "PENDING",
  misMatch: "",
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
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetBank(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
    setMistmatch(state, action) {
      state.misMatch = action.payload;
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
  addVerifyStatus,
  setMistmatch,
  resetBank,
} = bankSlice.actions;

export default bankSlice.reducer;
