import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  name: "",
  dob: "",
  bloodGroup: "",
  classes: {},
  rto: {},
  validity: {},
  verifyMsg: "",
  verifyStatus: "PENDING",
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
    addName(state, action) {
      state.name = action.payload;
    },
    addLicenseVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addLicenseVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    addBloodGroup(state, action) {
      state.bloodGroup = action.payload;
    },
    addRto(state, action) {
      state.rto = action.payload;
    },
    addValidity(state, action) {
      state.validity = action.payload;
    },
    addClasses(state, action) {
      state.classes = action.payload;
    },
    addPhoto(state, action) {
      state.photo = action.payload;
    },
    resetLicense(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addLicenseNumber,
  resetLicense,
  addLicenseVerifyStatus,
  addDob,
  addLicenseVerifyMsg,
  addClasses,
  addValidity,
  addRto,
  addBloodGroup,
  addName,
  addPhoto,
} = licenseSlice.actions;
export default licenseSlice.reducer;
