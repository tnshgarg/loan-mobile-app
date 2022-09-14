import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "", //TODO: this should be fetched from AsyncStorage
  onboarded: false,
  phoneNumber: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addId(state, action) {
      state.id = action.payload;
    },
    addOnboarded(state, action) {
      state.onboarded = action.payload;
    },
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addId, addOnboarded, addPhoneNumber, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;
