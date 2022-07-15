import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  esic: "",
};

const esicSlice = createSlice({
  name: "esic",
  initialState: initialState,
  reducers: {
  },
});

export const { } = esicSlice.actions;
export default esicSlice.reducer;

// YTBD