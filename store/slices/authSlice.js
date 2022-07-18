import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "", //TODO: this should be fetched from AsyncStorage
  phoneNumber: "",
  verifyStatus: "PENDING",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    addId(state, action) {
      state.userId = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const { addId, addPhoneNumber, addVerifyStatus } = authSlice.actions;
export default authSlice.reducer;
