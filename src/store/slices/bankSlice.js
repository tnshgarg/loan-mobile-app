import { createSlice } from "@reduxjs/toolkit";
import { bankApi } from "../apiSlices/bankApi";

const initialState = {
  data: {
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    branchCity: "",
    ifsc: "",
    upi: "",
  },
  verifyStatus: "PENDING",
  misMatch: "",
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    addAccountHolderName(state, action) {
      state.data.accountHolderName = action.payload;
    },
    addAccountNumber(state, action) {
      state.data.accountNumber = action.payload;
    },
    addBankName(state, action) {
      state.data.bankName = action.payload;
    },
    addBranchName(state, action) {
      state.data.branchName = action.payload;
    },
    addBranchCity(state, action) {
      state.data.branchCity = action.payload;
    },
    addIfsc(state, action) {
      state.data.ifsc = action.payload;
    },
    addUpi(state, action) {
      state.data.upi = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetBank(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
    setMistmatch(state, action) {
      state.misMatch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bankApi.endpoints.verifyBank.matchFulfilled,
      (state, { payload }) => {
        console.tron.log("payload: ", payload);
        state.data.accountHolderName = payload?.body?.data?.accountHolderName;
        state.data.accountNumber = payload?.body?.data?.accountNumber;
        state.data.bankName = payload?.body?.data?.bankName;
        state.data.branchName = payload?.body?.data?.branchName;
        state.data.branchCity = payload?.body?.data?.branchCity;
        state.data.ifsc = payload?.body?.data?.ifsc;
        state.data.upi = payload?.body?.data?.upi;
        state.verifyStatus = payload?.body?.verifyStatus;
      }
    )
  },
});

export const {
  addAccountHolderName,
  addAccountNumber,
  addBankName,
  addBranchName,
  addBranchCity,
  addIfsc,
  addUpi,
  addVerifyStatus,
  setMistmatch,
  resetBank,
} = bankSlice.actions;

export default bankSlice.reducer;
