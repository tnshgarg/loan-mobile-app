import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maritalStatus: "",
  qualification: "",
  altMobile: "",
  email: "",
  photo: "",
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
    addPhoto(state, action) {
      state.photo = action.payload;
    },
    resetProfile(state, action) {
      if (!action.payload) {
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
  addPhoto,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
