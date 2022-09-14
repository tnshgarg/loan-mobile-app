import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  consent: false,
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
  },
});

export const { addAmount, addConsent } = ewaLandingSlice.actions;
export default ewaLandingSlice.reducer;
