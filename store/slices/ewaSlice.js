import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offerId: "",
  stage: "",
  eligibleDays: "",
  eligibleAmount: "20000",
  fees: "5",
  dueDate: "23/10/22",
  loanAmount: "",
  status: {
    offer: "PENDING",
    kyc: "PENDING",
    agreement: "PENDING",
    mandate: "PENDING",
  },
};

const ewaSlice = createSlice({
  name: "ewa",
  initialState: initialState,
  reducers: {
    addOfferId(state, action) {
      state.offerId = action.payload;
    },
    addStage(state, action) {
      state.stage = action.payload;
    },
    addEligibleDays(state, action) {
      state.eligibleDays = action.payload;
    },
    addEligibleAmount(state, action) {
      state.eligibleAmount = action.payload;
    },
    addFees(state, action) {
      state.fees = action.payload;
    },
    addDueDate(state, action) {
      state.dueDate = action.payload;
    },
    addLoanAmount(state, action) {
      state.loanAmount = action.payload;
    },
    addStatus(state, action) {
      switch (action.payload.type) {
        case "offer":
          state.status.offer = action.payload.data;
          break;
        case "kyc":
          state.status.kyc = action.payload.data;
          break;
        case "agreement":
          state.status.agreement = action.payload.data;
          break;
        case "mandate":
          state.status.mandate = action.payload.data;
          break;
      }
    },
    resetEwa(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addOfferId,
  addStage,
  addDueDate,
  addEligibleAmount,
  addEligibleDays,
  addFees,
  addLoanAmount,
  addStatus,
  resetEwa,
} = ewaSlice.actions;

export default ewaSlice.reducer;
