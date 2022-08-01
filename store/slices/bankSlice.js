import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: "",
  ifsc: "",
  upi: "",
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
      state.upi = action.payload;
    },
    addBankVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
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
  addBankUpiId,
  addBankVerifyStatus,
  resetBank,
} = bankSlice.actions;
export default bankSlice.reducer;
