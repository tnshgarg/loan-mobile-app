import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  verifyStatus: "PENDING",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const { addNumber, addVerifyStatus } = panSlice.actions;
export default panSlice.reducer;
