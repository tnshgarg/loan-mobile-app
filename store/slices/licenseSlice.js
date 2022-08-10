import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  verifyStatus: "PENDING",
  dob: "",
  verifyMsg: "",
  classes: "",
};

const licenseSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addLicenseNumber(state, action) {
      state.number = action.payload;
    },
    addDob(state, action) {
      state.dob = action.payload;
    },
    addLicenseVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addLicenseVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    resetLicense(state) {
      Object.assign(state, initialState);
    },
    addVehicleClasses(state){
      state.classes = action.payload;
    }
  },
});

export const {
  addLicenseNumber,
  resetLicense,
  addLicenseVerifyStatus,
  addDob,
  addLicenseVerifyMsg,
} = licenseSlice.actions;
export default licenseSlice.reducer;
