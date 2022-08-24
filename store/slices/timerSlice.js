import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: 2 * 60 ,
  aadhaar: 10 * 60,
};

const timerSlice = createSlice({
  name: "profile",
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
