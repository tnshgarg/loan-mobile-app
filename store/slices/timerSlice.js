import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: 1 * 30,
  aadhaar: 1 * 30,
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    setLoginTimer: (state, action) => {
      state.login = action.payload;
    },
    setAadhaarTimer: (state, action) => {
      state.aadhaar = action.payload;
    },
    resetTimer(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setLoginTimer, setAadhaarTimer, resetTimer } =
  timerSlice.actions;

export default timerSlice.reducer;
