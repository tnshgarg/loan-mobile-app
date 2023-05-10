import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { addData, addVerifyStatus } from "../../store/slices/aadhaarSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { putBackendData } from "../../services/employees/employeeServices";
import { showToast } from "../../components/atoms/Toast";

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

  const [verifyOtp] = useVerifyOtpMutation();
  const goForFetch = () => {
    setLoading(true);
    console.log("aadhaarSlice: ", aadhaarSlice);
    const data = {
      unipeEmployeeId: unipeEmployeeId,
      otp: props.data.otp,
      campaignId: campaignId,
      provider: "ongrid",
    };
    verifyOtp(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/aadhaar-submit-otp res: ", res);
        const responseJson = res?.data;
        console.log(
          "kyc/aadhaar-submit-otp responseJson: ",
          JSON.stringify(responseJson)
        );
        try {
          if (responseJson?.status === 200) {
            props.setVerified(true);
            dispatch(addData(responseJson?.body?.data));
            Analytics.trackEvent("Aadhaar|Verify|Success", {
              unipeEmployeeId: unipeEmployeeId,
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
          showToast(error?.message, "error");
          Analytics.trackEvent("Aadhaar|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `submitAadhaarOTP API Catch Error: ${
              error.message
            }, ${JSON.stringify(res)}`,
          });
          if (error?.status === 406) {
            Alert.alert("Otp mismatch", "OTP is incorrect. Please try again.");
          } else {
            showToast(error?.message, "error");
            navigation.goBack();
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(addVerifyStatus("ERROR"));
        showToast(error?.message, "error");
        Analytics.trackEvent("Aadhaar|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `submitAadhaarOTP Catch Error: ${error.message}`,
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
