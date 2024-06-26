import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { useVerifyPanMutation } from "../../store/apiSlices/panApi";
import { addVerifyStatus } from "../../store/slices/panSlice";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const [verifyPan] = useVerifyPanMutation();
  const goForFetch = () => {
    setLoading(true);
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "pan",
      action: "CONTINUE",
    });

    const data = {
      unipeEmployeeId: unipeEmployeeId,
      panNumber: props.number,
      campaignId: campaignId,
      provider: "karza",
    };
    verifyPan(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/pan-fetch-details res: ", res);
        setLoading(false);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "pan",
          action: "VALID",
        });

        navigation.navigate("PanConfirm");
      })
      .catch((error) => {
        console.log("kyc/pan-fetch-details error: ", error);
        dispatch(addVerifyStatus("ERROR"));
        Alert.alert("fetchPanDetails API Catch Error", error.message);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "pan",
          action: "INVALID",
          error: `fetchPanDetails Catch Error: ${JSON.stringify(error)}`,
        });
        setLoading(false);
      });
  };

  return (
    <PrimaryButton
      accessibilityLabel={"PanVerifyBtn"}
      title={loading ? strings.verifying : strings.continue}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default PanVerifyApi;
