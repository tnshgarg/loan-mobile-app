import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: null,
  ifsc: null,
  upi: null,
  holderName: null,
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    addBank(state, action) {
      state.accountNumber = action.payload.accountNumber;
      state.ifsc = action.payload.ifsc;
      state.upi = action.payload.upi;
      state.holderName = action.payload.holderName;
    },
  },
});

export const { addBank } = bankSlice.actions;
export default bankSlice.reducer;
