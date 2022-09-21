import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  consent: false,
  status: "PENDING",
};

const ewaLandingSlice = createSlice({
  name: "ewaLanding",
  initialState: initialState,
  reducers: {
    addAmount(state, action) {
      state.amount = action.payload;
    },
    addConsent(state, action) {
      state.consent = action.payload;
    },
    addStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { addAmount, addConsent, addStatus } = ewaLandingSlice.actions;
export default ewaLandingSlice.reducer;
