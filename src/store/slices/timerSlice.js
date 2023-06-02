import { createSlice } from "@reduxjs/toolkit";
import { api } from "../apiSlices/api";

const initialState = {
  login: 2 * 60,
  aadhaar: 10 * 60,
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
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     api.endpoints.generateAadhaarOtp.matchFulfilled,
  //     (state, { payload }) => {
  //       state.token = payload.token;
  //     }
  //   );
  // },
});

export const { setLoginTimer, setAadhaarTimer, resetTimer } =
  timerSlice.actions;

export default timerSlice.reducer;
