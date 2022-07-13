import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selfie: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    addImage(state, action) {
      state.selfie = action.payload;
    },
  },
});

export const { addImage } = imageSlice.actions;
export default imageSlice.reducer;
