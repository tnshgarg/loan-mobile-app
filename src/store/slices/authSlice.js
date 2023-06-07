import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aCTC: "100000",
  employeeName: "Shubham",
  onboarded: false,
  phoneNumber: "9870097513",
  token: "fleLKiprTBSIgg_IKzvXtu:APA91bEAWGdq2jaKT4Y850OM44XPTj8Ic6D0EOM5lpRKbLh9Ij8rkOeSxbq9qB9TUtHQyXTLJ1dLo5pwrxkCCVBX9NvbmPWygmUD-2S4m6kALCvtxeRQDpzO1HBZyzznsDrc8tMTIsRo",
  unipeEmployeeId: "6377939f89f886a21c410d91",
  loggedOut: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addACTC(state, action) {
      state.aCTC = action.payload;
    },
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
      state.loggedOut = false;
    },
    addUnipeEmployeeId(state, action) {
      state.unipeEmployeeId = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addACTC,
  addEmployeeName,
  addOnboarded,
  addPhoneNumber,
  addToken,
  addUnipeEmployeeId,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
