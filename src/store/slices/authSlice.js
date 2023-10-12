import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../apiSlices/loginApi";

const initialState = {
  employeeName: "",
  onboarded: false,
  phoneNumber: "",
  token: "",
  unipeEmployeeId: "",
  loggedOut: true,
  kycServiceToken: "",
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
      state.loggedOut = !action.payload;
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
      loginApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        console.log("payload: ", payload);
        state.token = payload?.token;
        state.onboarded = payload.employeeDetails?.onboarded;
        state.unipeEmployeeId = payload.employeeDetails?.unipeEmployeeId;
        state.employeeName = payload.employeeDetails?.name;
        state.kycServiceToken = payload.kyc_service_tokens?.access_token;
      }
    );
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
