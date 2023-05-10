import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { COLORS, FONTS } from "../../constants/Theme";
import { putBackendData } from "../../services/employees/employeeServices";
import { showToast } from "../../components/atoms/Toast";
import {useGenerateOtpMutation} from "../../store/apiSlices/aadhaarApi";
const AadhaarOtpApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [generateOtp] = useGenerateOtpMutation();
  const goForFetch = () => {
    // setLoading(true);
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

    generateOtp(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/aadhaar-generate-otp res: ", res);
        // try {
        //   if (responseJson?.status === 200) {
        //     dispatch(resetTimer());
        //     showToast(responseJson?.body?.message, "success");
        //     Analytics.trackEvent("Aadhaar|Otp|Success", {
        //       unipeEmployeeId: unipeEmployeeId,
        //     });
        //     setLoading(false);
        //     dispatch(addVerifyStatus(responseJson?.body?.verifyStatus));
        //     if (props.type !== "KYC") {
        //       navigation.navigate("AadhaarVerify");
        //     }
        //   } else {
        //     throw responseJson;
        //   }
        // } catch (error) {
        //   dispatch(addVerifyStatus("ERROR"));
        //   showToast(error?.message, "error");
        //   Analytics.trackEvent("Aadhaar|Otp|Error", {
        //     unipeEmployeeId: unipeEmployeeId,
        //     error: `generateAadhaarOTP API Catch Error: ${
        //       error.message
        //     }, ${JSON.stringify(res)}`,
        //   });
        //   setLoading(false);
        // }
      })
      .catch((error) => {
        dispatch(addVerifyStatus("ERROR"));
        showToast(error?.message, "error");
        Analytics.trackEvent("Aadhaar|Otp|Error", {
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
