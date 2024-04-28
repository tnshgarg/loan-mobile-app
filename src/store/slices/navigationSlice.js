import analytics from "@react-native-firebase/analytics";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "Localization",
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
    },
    resetNavigation(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addCurrentScreen, addCurrentStack, resetNavigation } =
  navigationSlice.actions;
export default navigationSlice.reducer;
