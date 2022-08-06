import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "", //TODO: this should be fetched from AsyncStorage
  phoneNumber: "",
  verifyStatus: "PENDING",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addId(state, action) {
      state.id = action.payload;
    },
    addLoginVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addId, addPhoneNumber, addLoginVerifyStatus, resetAuth } =
  authSlice.actions;
export default authSlice.reducer;
