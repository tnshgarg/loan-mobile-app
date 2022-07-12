import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    addId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { addId, addPhoneNumber } = authSlice.actions;
export default authSlice.reducer;
