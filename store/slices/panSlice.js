import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  number: "",
  verifyMsg: "",
  verifyStatus: "PENDING",
  verifyTimestamp: "",
  misMatch : ""
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
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
    addVerifyTimestamp(state, action) {
      state.verifyTimestamp = action.payload;
    },
    resetPan(state, action) {
      if (!action.payload) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
    setMistmatch(state, action) {
      state.misMatch = action.payload;
    }
  },
});

export const {
  addData,
  addNumber,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
  setMistmatch,
  resetPan,
} = panSlice.actions;

export default panSlice.reducer;
