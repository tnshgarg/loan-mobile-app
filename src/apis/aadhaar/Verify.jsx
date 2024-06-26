import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import InfoCard from "../../components/atoms/InfoCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { asyncTimeout } from "../../helpers/asyncTimer";
import { KYC_RETRY_WAIT_TIME } from "../../services/constants";
import { getBackendData } from "../../services/employees/employeeServices";
import { useVerifyAadhaarOtpMutation } from "../../store/apiSlices/aadhaarApi";

const AadhaarVerifyApi = (props) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [delayedResponseText, setDelayedResponseText] = useState("");

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const handleOtpSuccess = (responseJson) => {
    props.setVerified(true);
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "aadhaarOtp",
      action: "VALID",
    });
    setLoading(false);
    if (props.type !== "KYC") {
      navigation.navigate("AadhaarConfirm");
    }
  };
  const handleOtpError = (error, res) => {
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "aadhaarOtp",
      action: "INVALID",
      error: `submitAadhaarOTP API Catch Error: ${JSON.stringify(
        error
      )}, ${JSON.stringify(res)}`,
    });
    if (error?.status === 406) {
      Alert.alert("Otp mismatch", "OTP is incorrect. Please try again.");
    } else {
      Alert.alert(
        "submitAadhaarOTP Error",
        error?.body?.message || error?.body?.verifyMsg
      );
      navigation.goBack();
    }
    setLoading(false);
  };
  const handleAPIResponseDelay = async () => {
    setDelayedResponseText("We are still getting your details please wait....");
    await asyncTimeout(KYC_RETRY_WAIT_TIME);
    getBackendData({
      params: { unipeEmployeeId: unipeEmployeeId },
      xpath: "aadhaar",
      token: token,
    })
      .then(({ data: { body, status } }) => {
        if (status == 200 && body?.verifyStatus == "INPROGRESS_CONFIRMATION") {
          handleOtpSuccess({ body, status });
        } else {
          const res = { body, status };
          // FIXME: poor handling practice
          if (body?.verifyMsg == "Invalid OTP.") res.status = 406;
          handleOtpError(res, res);
        }
      })
      .catch((error) => {
        handleOtpError(error);
      })
      .finally(() => {
        setDelayedResponseText("");
      });
  };

  const handleAPIErrorWithRetry = async (error, res) => {
    if (error?.response?.status == 504) {
      handleAPIResponseDelay();
    } else {
      handleOtpError(error, res);
    }
  };

  const [verifyAadhaarOtp] = useVerifyAadhaarOtpMutation();
  const goForFetch = () => {
    setLoading(true);
    const data = {
      unipeEmployeeId: unipeEmployeeId,
      otp: props.data.otp,
      campaignId: campaignId,
      provider: "karza",
    };
    verifyAadhaarOtp(data)
      .unwrap()
      .then((responseJson) => {
        handleOtpSuccess(responseJson);
      })
      .catch((error) => {
        handleAPIErrorWithRetry(error);
      });
  };

  return (
    <>
      {delayedResponseText ? (
        <InfoCard
          info={delayedResponseText}
          icon="beenhere"
          color={COLORS.primary}
        />
      ) : (
        <></>
      )}
      <PrimaryButton
        accessibilityLabel={"AadhaarVerifyBtn"}
        title={loading ? strings.verifying : strings.continue}
        disabled={props.disabled}
        loading={loading}
        onPress={() => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "aadhaarOtp",
            action: "CONTINUE",
          });
          goForFetch();
        }}
      />
    </>
  );
};

export default AadhaarVerifyApi;
