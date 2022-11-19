import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "Login",
  currentStack : "OnboardingStack",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addCurrentScreen(state, action) {
      state.currentScreen = action.payload;
    },
    addCurrentStack(state, action) {
      state.currentStack = action.payload;
    },
    resetNavigation(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addCurrentScreen,addCurrentStack,resetNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
