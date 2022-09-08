import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maritalStatus: "",
  educationalQualification: "",
  alternatePhone: "",
  email: "",
  photo: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    addAlternatePhone(state, action) {
      state.alternatePhone = action.payload;
    },
    addEducationalQualification(state, action) {
      state.educationalQualification = action.payload;
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
  addAlternatePhone,
  addEducationalQualification,
  addEmail,
  addMaritalStatus,
  addPhoto,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
