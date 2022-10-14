import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ewaHistoricalSlice = createSlice({
  name: "ewaHistorical",
  initialState: initialState,
  reducers: {
    resetEwaHistorical(state, action) {
      return [...action.payload];
    },
  },
});

export const { resetEwaHistorical } = ewaHistoricalSlice.actions;

export default ewaHistoricalSlice.reducer;
