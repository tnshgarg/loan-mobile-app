import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "",
  dob: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addPanName(state, action) {
      state.name = action.payload;
    },
    addPanNumber(state, action) {
      state.number = action.payload;
    },
    addPanDob(state, action) {
      state.dob = action.payload;
    },
    addPanVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    addPanVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetPan(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addPanName,
  addPanNumber,
  addPanDob,
  addPanVerifyMsg,
  addPanVerifyStatus,
  resetPan,
} = panSlice.actions;

export default panSlice.reducer;
