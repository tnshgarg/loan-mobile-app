import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboardingCampaignId: "",
  ekycCampaignId: "",
  ewaCampaignId: "",
  repaymentCampaignId: "",
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState: initialState,
  reducers: {
    addOnboardingCampaignId(state, action) {
      state.onboardingCampaignId = action.payload;
    },
    addEkycCampaignId(state, action) {
      state.ekycCampaignId = action.payload;
    },
    addEwaCampaignId(state, action) {
      state.ewaCampaignId = action.payload;
    },
    addRepaymentCampaignId(state, action) {
      state.repaymentCampaignId = action.payload;
    },
  },
});

export const {
  addOnboardingCampaignId,
  addEkycCampaignId,
  addEwaCampaignId,
  addRepaymentCampaignId,
} = campaignSlice.actions;

export default campaignSlice.reducer;
