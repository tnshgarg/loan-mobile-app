import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: null,
  ifsc: null,
  upi: null,
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    addBank(state, action) {
      state.number = action.payload.accNo;
      state.ifsc = action.payload.ifsc;
      state.upi = action.payload.upi;
    },
  },
});

export const { addBank } = bankSlice.actions;
export default bankSlice.reducer;
