import { createSlice } from "@reduxjs/toolkit";
import { api } from "../apiSlices/api";

const initialState = {
  employeeName: "",
  onboarded: false,
  phoneNumber: "",
  token: "",
  unipeEmployeeId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addEmployeeName(state, action) {
      state.employeeName = action.payload;
    },
    addOnboarded(state, action) {
      state.onboarded = action.payload;
    },
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    addToken(state, action) {
      state.token = action.payload;
    },
    addUnipeEmployeeId(state, action) {
      state.unipeEmployeeId = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        console.log("payload: ", payload);
        state.token = payload.token;
        state.onboarded = payload.employeeDetails.onboarded;
        state.unipeEmployeeId = payload.employeeDetails.unipeEmployeeId;
        state.employeeName = payload.employeeDetails.name;
      }
    )
  },
});

export const {
  addEmployeeName,
  addOnboarded,
  addPhoneNumber,
  addToken,
  addUnipeEmployeeId,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
