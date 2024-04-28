import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dueDate: null,
  overdueDays: 0,
  repaymentAmount: 0,
  repaymentId: null,
  repaymentOrderId: null,
  repaymentStatus: null,
};

const repaymentSlice = createSlice({
  name: "repayment",
  initialState: initialState,
  reducers: {
    resetRepayment(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const {
  resetRepayment,
} = repaymentSlice.actions;

export default repaymentSlice.reducer;
