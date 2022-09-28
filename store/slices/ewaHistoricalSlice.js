import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ewaHistoricalSlice = createSlice({
  name: "ewaHistorical",
  initialState: initialState,
  reducers: {
    addOffers(state, action) {
      return action.payload;
    },
  },
});

export const { addOffers } = ewaHistoricalSlice.actions;

export default ewaHistoricalSlice.reducer;
