import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maritalStatus: "",
  educationalQualification: "",
  alternatePhone: "",
  email: "",
  selfie: "",
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
    addSelfie(state, action) {
      state.selfie = action.payload;
    },
    addMaritalStatus(state, action) {
      state.maritalStatus = action.payload;
    },
  },
});

export const {
  addAlternatePhone,
  addEducationalQualification,
  addEmail,
  addSelfie,
  addMaritalStatus,
} = profileSlice.actions;
export default profileSlice.reducer;
