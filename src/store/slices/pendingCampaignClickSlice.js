import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedUrl: ""
};

const pendingCampaignClickSlice = createSlice({
  name: "pendingCampaignClick",
  initialState: initialState,
  reducers: {
    setPendingUrl(state, action) {
      state.clickedUrl = action.payload;
    }
  },
});

export const { setPendingUrl } = pendingCampaignClickSlice.actions;
export default pendingCampaignClickSlice.reducer;
