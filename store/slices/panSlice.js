import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  verifyStatus: "",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addNumber(state, action) {
      state.number = action.payload;
    },
    setVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const { addNumber, setVerifyStatus } = panSlice.actions;
export default panSlice.reducer;
