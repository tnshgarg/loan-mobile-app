import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboarded: false,
  phoneNumber: "",
  token: "",
  unipeEmployeeId: "",
  campaignId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addOnboarded(state, action) {
      state.onboarded = action.payload;
    },
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    addToken(state, action) {
      state.token = action.payload;
    },
    addUnipeEmployeeId(state, action) {
      state.unipeEmployeeId = action.payload;
    },
    addCampaignId(state, action) {
      state.campaignId = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addOnboarded,
  addPhoneNumber,
  addToken,
  addUnipeEmployeeId,
  addCampaignId,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
