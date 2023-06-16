import { addEkycCampaignId, addEwaCampaignId, addOnboardingCampaignId, addRepaymentCampaignId } from "../../store/slices/campaignSlice";
import {store} from "../../store/store"

const ACTION_MAP = ({
    "ewa": addEwaCampaignId,
    "repayment": addRepaymentCampaignId,
    "ekyc": addEkycCampaignId,
    "onboarding": addOnboardingCampaignId
});

export const setCampaignStoreData = ({campaignType, campaignId}) => {
    const campaignAction = ACTION_MAP[campaignType];
    if (campaignAction){
        store.dispatch(campaignAction(campaignId))
        console.log("dispatched campaign action", {campaignType, campaignId})
    } else {
        console.log("no valid action for campaign type")
    }
}