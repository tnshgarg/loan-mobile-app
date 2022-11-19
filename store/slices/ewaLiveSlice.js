import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offerId: "",
  dueDate: "",
  eligibleAmount: 0,
  employerId: "",
  employmentId: "",
  fees: 5,
  loanAmount: "",
  stage: "",
  netAmount: 0,
  processingFees: 0,
};

const ewaLiveSlice = createSlice({
  name: "ewaLive",
  initialState: initialState,
  reducers: {
    addLoanAmount(state, action) {
      state.loanAmount = action.payload;
    },
    addNetAmount(state, action) {
      state.netAmount = action.payload;
    },
    addProcessingFees(state, action) {
      state.processingFees = action.payload;
    },
    resetEwaLive(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const { addLoanAmount, addNetAmount, addProcessingFees, resetEwaLive } =
  ewaLiveSlice.actions;

export default ewaLiveSlice.reducer;
