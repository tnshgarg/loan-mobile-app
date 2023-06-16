import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  useGenerateAadhaarOtpMutation,
  useGetAadhaarQuery,
} from "../../store/apiSlices/aadhaarApi";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import Analytics, { InteractionTypes } from "../../helpers/analytics/commonAnalytics";
import { getBackendData } from "../../services/employees/employeeServices";
import { asyncTimeout } from "../../helpers/asyncTimer"
import InfoCard from "../../components/atoms/InfoCard";
import { KYC_RETRY_WAIT_TIME } from "../../services/constants";

const AadhaarOtpApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [delayedResponseText, setDelayedResponseText]= useState("");
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const handleOtpSuccess = (responseJson) => {
    console.log({responseJson})
    dispatch(resetTimer());
    showToast(responseJson?.body?.message || responseJson?.body?.verifyMsg);
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
  }
  
  const handleOtpError = async (error, res) => {
    console.error({error, res})
    dispatch(addVerifyStatus("ERROR"));
    Alert.alert("generateAadhaarOTP Catch Error", res?.body?.verifyMsg || JSON.stringify(error));
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      component: "Aadhaar",
      action: "Otp",
      status: "Error",
      error: `generateAadhaarOTP API Catch Error: ${JSON.stringify(error)}`,
    });
    setLoading(false);
  }

  const [generateAadhaarOtp] = useGenerateAadhaarOtpMutation();
  const handleAPIResponseDelay = async () => {
    setDelayedResponseText("We are still getting your details please wait....")
    await asyncTimeout(KYC_RETRY_WAIT_TIME);
    getBackendData({ 
      params: { unipeEmployeeId: unipeEmployeeId }, 
      xpath: "aadhaar", 
      token: token  
    }).then(
      ({data: {body, status}}) => {
        if (status == 200 && body?.verifyStatus == "INPROGRESS_OTP") {
          handleOtpSuccess({body, status})
        } else {
          const res = {body, status}
          // FIXME: poor handling practice
          handleOtpError(res, res)
        }
      }
    ).catch(error => {
      handleOtpError(error)
    }).finally(() => {
      setDelayedResponseText("")
    })
  }
  
  const handleAPIErrorWithRetry = async (error, res) => {
    if (error?.response?.status == 504) {
      handleAPIResponseDelay()
    } else {
      handleOtpError(error, res);
    }
  }
  const goForFetch = () => {
    setLoading(true);

    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }
    let data = {
      unipeEmployeeId: unipeEmployeeId,
      aadhaarNumber: props.number,
      campaignId: campaignId,
      provider: "ongrid",
    };

    generateAadhaarOtp(data)
      .unwrap()
      .then((res) => {
        console.log("first");
        console.log("kyc/aadhaar-generate-otp res: ", res);
        const responseJson = res?.data;
        console.log("kyc/aadhaar-generate-otp responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            handleOtpSuccess(responseJson)
          } else {
            throw responseJson;
          }
        } catch (error) {
          handleAPIErrorWithRetry(error, res)
        }
      })
      .catch((error) => {
        handleAPIErrorWithRetry(error)
      });
  };

  return props.isTextButton ? (
    <Text style={{ ...FONTS.h4, color: COLORS.primary }} onPress={goForFetch}>
      {props.textButton}
    </Text>
  ) : (
    <>
      {delayedResponseText ? <InfoCard info={delayedResponseText} icon="beenhere" color={COLORS.primary}/> : <></>}
      <PrimaryButton
        accessibilityLabel={"AadhaarOtpBtn"}
        title={loading ? "Verifying" : props.title || "Continue"}
        disabled={props.disabled}
        loading={loading}
        onPress={() => {
          goForFetch();
        }}
      />
    </>
  );
};

export default AadhaarOtpApi;
