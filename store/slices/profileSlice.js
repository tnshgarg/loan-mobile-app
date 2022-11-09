import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maritalStatus: "",
  qualification: "",
  altMobile: "",
  email: "",
  motherName: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    addAltMobile(state, action) {
      state.altMobile = action.payload;
    },
    addQualification(state, action) {
      state.qualification = action.payload;
    },
    addEmail(state, action) {
      state.email = action.payload;
    },
    addMaritalStatus(state, action) {
      state.maritalStatus = action.payload;
    },
    addMotherName(state, action) {
      state.motherName = action.payload;
    },
    resetProfile(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const {
  addAltMobile,
  addQualification,
  addEmail,
  addMaritalStatus,
  resetProfile,
  addMotherName,
} = profileSlice.actions;

export default profileSlice.reducer;
