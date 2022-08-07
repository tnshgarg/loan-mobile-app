import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "Welcome",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addCurrentScreen(state, action) {
      state.currentScreen = action.payload;
    },
    resetNavigation(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addCurrentScreen, resetNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
