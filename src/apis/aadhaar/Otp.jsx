import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import { COLORS, FONTS } from "../../constants/Theme";
import { useGenerateAadhaarOtpMutation } from "../../store/apiSlices/aadhaarApi";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { resetTimer } from "../../store/slices/timerSlice";

const AadhaarOtpApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [generateAadhaarOtp] = useGenerateAadhaarOtpMutation();
  const goForFetch = () => {
    setLoading(true);
    console.log("aadhaarSlice: ", aadhaarSlice);

    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }
    let data = {
      unipeEmployeeId: unipeEmployeeId,
      aadhaarNumber: aadhaarSlice?.number,
      campaignId: campaignId,
      provider: "ongrid",
    };

    generateAadhaarOtp(data)
      .unwrap()
      .then((res) => {
        console.log("first");
        console.log("kyc/aadhaar-generate-otp res: ", res);
        dispatch(resetTimer());
        showToast(res?.body?.message, "success");
        analytics().logEvent("Aadhaar_Otp_Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        setLoading(false);
        dispatch(addVerifyStatus(res?.body?.verifyStatus));
        if (props.type !== "KYC") {
          navigation.navigate("AadhaarVerify");
        }
      })
      .catch((error) => {
        console.log({ error });
        console.log("kyc/aadhaar-generate-otp error: ", error);
        dispatch(addVerifyStatus("ERROR"));
        showToast(error?.message, "error");
        analytics().logEvent("Aadhaar_Otp_Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `generateAadhaarOTP API Catch Error: ${error.message}`,
        });
        setLoading(false);
      });
  };

  return props.isTextButton ? (
    <Text style={{ ...FONTS.h4, color: COLORS.primary }} onPress={goForFetch}>
      {props.textButton}
    </Text>
  ) : (
    <PrimaryButton
      accessibilityLabel={"AadhaarOtpBtn"}
      title={loading ? "Verifying" : props.title || "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default AadhaarOtpApi;
