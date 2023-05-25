import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addData,
  addVerifyStatus,
} from "../../store/slices/aadhaarSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics, {InteractionTypes} from "../../helpers/analytics/commonAnalytics";
import { putBackendData } from "../../services/employees/employeeServices";

const AadhaarVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);

  const goForFetch = () => {
    setLoading(true);
    console.log("aadhaarSlice: ", aadhaarSlice);

    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        otp: props.data.otp,
        campaignId: campaignId,
        provider: 'ongrid'
      },
      xpath: "kyc/aadhaar-submit-otp",
      token: token,
    })
      .then((res) => {
        console.log("kyc/aadhaar-submit-otp res: ", res);
        const responseJson = res?.data;
        console.log("kyc/aadhaar-submit-otp responseJson: ", JSON.stringify(responseJson));
        try {
          if (responseJson?.status === 200) {
            props.setVerified(true);
            dispatch(addData(responseJson?.body?.data));
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Aadhaar",
              action: "Verify",
              status: "Success"
            });
            setLoading(false);
            dispatch(addVerifyStatus(responseJson?.body?.verifyStatus));
            if (props.type !== "KYC") {
              navigation.navigate("AadhaarConfirm");
            }
          } else {
            throw responseJson;
          }
        } catch (error) {
          console.log("kyc/aadhaar-submit-otp error: ", error);
          dispatch(addVerifyStatus("ERROR"));
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "Aadhaar",
            action: "Verify",
            status: "Error",
            error: `submitAadhaarOTP API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
          if (error?.status === 406) {
            Alert.alert("Otp mismatch","OTP is incorrect. Please try again.");
          }
          else{
            Alert.alert("submitAadhaarOTP Error", error?.body?.message);
            navigation.goBack();
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("kyc/aadhaar-submit-otp error: ", error, JSON.stringify(error));
        dispatch(addVerifyStatus("ERROR"));
        Alert.alert("submitAadhaarOTP Catch Error", JSON.stringify(error));
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Aadhaar",
          action: "Verify",
          status: "Error",
          error: `submitAadhaarOTP Catch Error: ${JSON.stringify(error)}`,
        });
        setLoading(false);
        navigation.goBack();
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
