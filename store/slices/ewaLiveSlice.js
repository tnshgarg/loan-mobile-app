import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offerId: "",
  dueDate: "",
  eligibleAmount: 0,
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
    addOfferId(state, action) {
      state.offerId = action.payload;
    },
    addDueDate(state, action) {
      state.dueDate = action.payload;
    },
    addEligibleAmount(state, action) {
      state.eligibleAmount = action.payload;
    },
    addFees(state, action) {
      state.fees = action.payload;
    },
    addLoanAmount(state, action) {
      state.loanAmount = action.payload;
    },
    addStage(state, action) {
      state.stage = action.payload;
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

export const {
  addOfferId,
  addDueDate,
  addEligibleAmount,
  addFees,
  addLoanAmount,
  addStage,
  addStatus,
  addNetAmount,
  addProcessingFees,
  resetEwaLive,
} = ewaLiveSlice.actions;

export default ewaLiveSlice.reducer;
