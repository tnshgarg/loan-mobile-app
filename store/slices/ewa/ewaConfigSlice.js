import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eligibleAmount: "20000",
  processingFeeRate: "",
  dueDate: "",
};

const ewaConfigSlice = createSlice({
  name: "ewaConfig",
  initialState: initialState,
  reducers: {
    addEligibleAmount(state, action) {
      state.eligibleAmount = action.payload;
    },
    addProcessingFeeRate(state, action) {
      state.processingFeeRate = action.payload;
    },
    addDueDate(state, action) {
      state.dueDate = action.payload;
    },
  },
});

export const { addEligibleAmount, addProcessingFeeRate, addDueDate } =
ewaConfigSlice.actions;
export default ewaConfigSlice.reducer;
