import { createSlice } from "@reduxjs/toolkit";
import analytics from "@react-native-firebase/analytics";

const initialState = {
  currentScreen: "Login",
  currentStack: "OnboardingStack",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addCurrentScreen(state, action) {
      state.currentScreen = action.payload;
      analytics().logScreenView({
        screen_name: action.payload,
        screen_class: state.currentStack,
      });
    },
    addCurrentStack(state, action) {
      state.currentStack = action.payload;
      analytics().logScreenView({
        screen_class: action.payload,
      });
    },
    resetNavigation(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addCurrentScreen, addCurrentStack, resetNavigation } =
  navigationSlice.actions;
export default navigationSlice.reducer;
