import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountHolderName: "", // BANK
  accountNumber: "", // BANK
  ifsc: "", // BANK
  type: "", // MANDATE Type
  data: {}, // Ex: upi vpa
  status : "PENDING",
};

const ewaMandateSlice = createSlice({
  name: "ewaMandate",
  initialState: initialState,
  reducers: {
    addAccountHolderName(state, action) {
      state.accountHolderName = action.payload;
    },
    addAccountNumber(state, action) {
      state.accountNumber = action.payload;
    },
    addIfsc(state, action) {
      state.ifsc = action.payload;
    },
    addType(state, action) {
      state.type = action.payload;
    },
    addData(state, action) {
      state.data = action.payload;
    },
    addStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  addAccountHolderName,
  addAccountNumber,
  addIfsc,
  addType,
  addData,
  addStatus
} = ewaMandateSlice.actions;
export default ewaMandateSlice.reducer;
