import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addVerifyStatus,
} from "../../store/slices/aadhaarSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics, { InteractionTypes } from "../../helpers/analytics/commonAnalytics";
import { COLORS, FONTS } from "../../constants/Theme";
import { putBackendData } from "../../services/employees/employeeServices";
import { showToast } from "../../components/atoms/Toast";

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

  const goForFetch = () => {
    setLoading(true);
    console.log("aadhaarSlice: ", aadhaarSlice);

    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }
    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        aadhaarNumber: aadhaarSlice?.number,
        campaignId: campaignId,
        provider: 'ongrid'
      },
      xpath: "kyc/aadhaar-generate-otp",
      token: token,
    })
      .then((res) => {
        console.log("kyc/aadhaar-generate-otp res: ", res);
        const responseJson = res?.data;
        console.log("kyc/aadhaar-generate-otp responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            dispatch(resetTimer());
            showToast(responseJson?.body?.message);
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Aadhaar",
              action: "Otp",
              status: "Success"
            });
            setLoading(false);
            dispatch(addVerifyStatus(responseJson?.body?.verifyStatus));
            if (props.type !== "KYC") {
              navigation.navigate("AadhaarVerify");
            }
          } else {
            throw responseJson;
          }
        } catch (error) {
          dispatch(addVerifyStatus("ERROR"));
          Alert.alert("generateAadhaarOTP API Catch Error", JSON.stringify(error));
          Analytics.trackEvent( {
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "Aadhaar",
            action: "Otp",
            status: "Error",
            error: `generateAadhaarOTP API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(addVerifyStatus("ERROR"));
        Alert.alert("generateAadhaarOTP Catch Error", JSON.stringify(error));
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Aadhaar",
          action: "Otp",
          status: "Error",
          error: `generateAadhaarOTP API Catch Error: ${JSON.stringify(error)}`,
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
