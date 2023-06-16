import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useVerifyPanMutation } from "../../store/apiSlices/panApi";
import { addVerifyStatus } from "../../store/slices/panSlice";
import Analytics, {InteractionTypes} from "../../helpers/analytics/commonAnalytics";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const panSlice = useSelector((state) => state.pan);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const [verifyPan] = useVerifyPanMutation();
  const goForFetch = () => {
    setLoading(true);
    console.log("panSlice: ", panSlice);
    const data = {
      unipeEmployeeId: unipeEmployeeId,
      panNumber: panSlice?.number,
      campaignId: campaignId,
      provider: "ongrid",
    };
    verifyPan(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/pan-fetch-details res: ", res);
        if (res?.status === 200) {
          setLoading(false);
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "Pan",
            action: "Verify",
            status: "Error",
            error: `fetchPanDetails API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
          if (props.type !== "KYC") {
            navigation.navigate("PanConfirm");
          }
        } else {
          throw res;
        }
      })
      .catch((error) => {
        console.log("kyc/pan-fetch-details error: ", error);
        dispatch(addVerifyStatus("ERROR"));
        Alert.alert("fetchPanDetails API Catch Error", error.message);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Pan",
          action: "Verify",
          status: "Error",
          error: `fetchPanDetails Catch Error: ${JSON.stringify(error)}`,
        });
        setLoading(false);
      });
  };

  return (
    <PrimaryButton
      accessibilityLabel={"PanVerifyBtn"}
      title={loading ? "Verifying" : "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default PanVerifyApi;
