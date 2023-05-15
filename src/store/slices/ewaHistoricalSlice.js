import { createSlice } from "@reduxjs/toolkit";
import { ewaApi } from "../apiSlices/ewaApi";

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
  extraReducers: (builder) => {
    builder.addMatcher(
      ewaApi.endpoints.updateAgreement.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, initialState);
      }
    );
  },
});

export const { resetEwaHistorical } = ewaHistoricalSlice.actions;

export default ewaHistoricalSlice.reducer;
