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
    addBankAccountNumber(state, action) {
      state.accountNumber = action.payload;
    },
    addBankAccountHolderName(state, action) {
      state.accountHolderName = action.payload;
    },
    addBankIfsc(state, action) {
      state.ifsc = action.payload;
    },
    addBankUpiId(state, action) {
      state.upiId = action.payload;
    },
    addBankVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const {
  addBankAccountHolderName,
  addBankAccountNumber,
  addBankIfsc,
  addBankUpiId,
  addBankVerifyStatus,
} = bankSlice.actions;
export default bankSlice.reducer;
