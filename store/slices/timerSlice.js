import { createSlice } from "@reduxjs/toolkit";
import { getCurrentTimestamp } from "../../helpers/TimeFunctions";

const initialState = {
  loginAt: "",
  aadhaarAt: "",
  login: 120,
  aadhaar: 10 * 60,
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    setLoginAt: (state, action) => {
      state.loginAt = getCurrentTimestamp();
    },
    setLoginTimer: (state, action) => {
      state.login = Math.max(
        0,
        state.login - (((getCurrentTimestamp() - state.loginAt) / 1000) % 60)
      );
    },
    setAadhaarAt: (state, action) => {
      state.aadhaarAt = action.payload;
    },
    setAadhaarTimer: (state, action) => {
      state.aadhaar = action.payload;
    },
    resetTimer(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setLoginAt,
  setLoginTimer,
  setAadhaarAt,
  setAadhaarTimer,
  resetTimer,
} = timerSlice.actions;
export default timerSlice.reducer;
