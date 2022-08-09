import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dob: "",
  email: "",
  gender: "",
  name: "",
  number: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addDob(state, action) {
      state.dob = action.payload;
    },
    addEmail(state, action) {
      state.email = action.payload;
    },
    addGender(state, action) {
      state.gender = action.payload;
    },
    addName(state, action) {
      state.name = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetPan(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addDob,
  addEmail,
  addGender,
  addName,
  addNumber,
  addVerifyMsg,
  addVerifyStatus,
  resetPan,
} = panSlice.actions;

export default panSlice.reducer;
