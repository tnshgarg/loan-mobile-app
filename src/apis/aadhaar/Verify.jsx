import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import { useVerifyAadhaarOtpMutation } from "../../store/apiSlices/aadhaarApi";
import { addData, addVerifyStatus } from "../../store/slices/aadhaarSlice";

const AadhaarVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [verifyAadhaarOtp] = useVerifyAadhaarOtpMutation();
  const goForFetch = () => {
    setLoading(true);
    console.log("aadhaarSlice: ", aadhaarSlice);
    const data = {
      unipeEmployeeId: unipeEmployeeId,
      otp: props.data.otp,
      campaignId: campaignId,
      provider: "ongrid",
    };
    verifyAadhaarOtp(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/aadhaar-submit-otp res: ", res);
        console.log("kyc/aadhaar-submit-otp res: ", JSON.stringify(res));
        props.setVerified(true);
        Analytics.trackEvent("Aadhaar|Verify|Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        setLoading(false);
        if (props.type !== "KYC") {
          navigation.navigate("AadhaarConfirm");
        }
      })
      .catch((error) => {
        console.log("kyc/aadhaar-submit-otp error: ", error);
        dispatch(addVerifyStatus("ERROR"));
        Analytics.trackEvent("Aadhaar|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `submitAadhaarOTP API Catch Error: ${error.message}`,
        });
        if (error?.status === 406) {
          Alert.alert("Otp mismatch", "OTP is incorrect. Please try again.");
        } else {
          Alert.alert("submitAadhaarOTP Error", error?.body?.message);
          navigation.goBack();
        }
        setLoading(false);
      });
  };

  return (
    <PrimaryButton
      accessibilityLabel={"AadhaarVerifyBtn"}
      title={loading ? "Verifying" : "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default AadhaarVerifyApi;
