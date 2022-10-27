import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fcmToken: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    addFcmToken(state, action) {
      state.fcmToken = action.payload;
    },
  },
});

export const { addFcmToken } = notificationSlice.actions;
export default notificationSlice.reducer;
