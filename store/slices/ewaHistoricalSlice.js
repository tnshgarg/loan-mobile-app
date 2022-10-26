import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ewaHistoricalSlice = createSlice({
  name: "ewaHistorical",
  initialState: initialState,
  reducers: {
    resetEwaHistorical(state, action) {
      if (!action.payload || action.payload.length === 0) {
        return initialState;
      } else {
        return [...action.payload];
      }
    },
  },
});

export const { resetEwaHistorical } = ewaHistoricalSlice.actions;

export default ewaHistoricalSlice.reducer;
