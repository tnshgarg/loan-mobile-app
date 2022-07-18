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
  },
});

export const { addId, addPhoneNumber, addLoginVerifyStatus } =
  authSlice.actions;
export default authSlice.reducer;
