import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: null,
};

const esicSlice = createSlice({
  name: "esic",
  initialState: initialState,
  reducers: {
  },
});

export const { addBank } = esicSlice.actions;
export default esicSlice.reducer;
