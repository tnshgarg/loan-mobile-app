import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  verifyStatus: "PENDING",
  verifyMessage: "",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addPanNumber(state, action) {
      state.number = action.payload;
    },
    addPanVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addPanVerifyMessage(state, action) {
      state.verifyMessage = action.payload;
    },
  },
});

export const { addPanNumber, addPanVerifyStatus, addPanVerifyMessage } = panSlice.actions;
export default panSlice.reducer;
