import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: "1000",
  processingFeeRate: "1",
  processingFeeAmount: "10",
  netDisbursementAmount: "1010",
  dueDate: "23/12/12",
};

const ewaAgreementSlice = createSlice({
  name: "ewaAgreement",
  initialState: initialState,
  reducers: {
    addAmount(state, action) {
      state.amount = action.payload;
    },
    addProcessingFeeRate(state, action) {
      state.processingFeeRate = action.payload;
    },
    addProcessingFeeAmount(state, action) {
      state.processingFeeAmount = action.payload;
    },
    addNetDisbursementAmount(state, action) {
      state.netDisbursementAmount = action.payload;
    },
    addDueDate(state, action) {
      state.dueDate = action.payload;
    },
  },
});

export const {
  addAmount,
  addProcessingFeeRate,
  addProcessingFeeAmount,
  addNetDisbursementAmount,
  addDueDate,
} = ewaAgreementSlice.actions;
export default ewaAgreementSlice.reducer;
