import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: { "maritalStatus": "", "education": "", "altnum": "", "email": "" },
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    addProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { addProfile } = profileSlice.actions;
export default profileSlice.reducer;
