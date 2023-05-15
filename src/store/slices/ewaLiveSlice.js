import { createSlice } from "@reduxjs/toolkit";
import { ewaApi } from "../apiSlices/ewaApi";
const initialState = {
  apr: 0,
  accessible: false,
  dueDate: "",
  eligible: false,
  eligibleAmount: 0,
  employerId: "",
  employmentId: "",
  fees: 5,
  loanAmount: 0,
  offerId: "",
  netAmount: 0,
  processingFees: 0,
  stage: "",
};

const ewaLiveSlice = createSlice({
  name: "ewaLive",
  initialState: initialState,
  reducers: {
    addAccessible(state, action) {
      state.accessible = action.payload;
    },
    addAPR(state, action) {
      state.apr = action.payload;
    },
    addEligible(state, action) {
      state.eligible = action.payload;
    },
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
  extraReducers: (builder) => {
    builder.addMatcher(
      ewaApi.endpoints.updateAgreement.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, initialState);
      }
    );
  },
});

export const {
  addAccessible,
  addAPR,
  addEligible,
  addLoanAmount,
  addNetAmount,
  addProcessingFees,
  resetEwaLive,
} = ewaLiveSlice.actions;

export default ewaLiveSlice.reducer;
