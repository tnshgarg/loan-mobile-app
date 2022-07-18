import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  verifyStatus: "PENDING",
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
  },
});

export const { addPanNumber, addPanVerifyStatus } = panSlice.actions;
export default panSlice.reducer;
