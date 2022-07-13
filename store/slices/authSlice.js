import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "62be55b1bb8d55cb4644801b",
  phoneNumber: null,
};

const authSlice = createSlice({
  name: "auth",
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
