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
import { putBackendData, getBackendData } from "../../services/employees/employeeServices";
import { asyncTimeout } from "../../helpers/asyncTimer";
import InfoCard from "../../components/atoms/InfoCard";
import { COLORS } from "../../constants/Theme";
import { KYC_RETRY_WAIT_TIME } from "../../services/constants";

const AadhaarVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [delayedResponseText, setDelayedResponseText]= useState("");

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);
  const handleOtpSuccess = (responseJson) => {
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
  }
  const handleOtpError = (error, res) => {
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
      Alert.alert("submitAadhaarOTP Error", error?.body?.message || error?.body?.verifyMsg);
      navigation.goBack();
    }
    setLoading(false);
  }
  const handleAPIResponseDelay = async () => {
    setDelayedResponseText("We are still getting your details please wait....")
    await asyncTimeout(KYC_RETRY_WAIT_TIME);
    getBackendData({ 
      params: { unipeEmployeeId: unipeEmployeeId }, 
      xpath: "aadhaar", 
      token: token  
    }).then(
      ({data: {body, status}}) => {
        if (status == 200 && body?.verifyStatus == "INPROGRESS_CONFIRMATION") {
          handleOtpSuccess({body, status})
        } else {
          const res = {body, status}
          // FIXME: poor handling practice
          if(body?.verifyMsg == "Invalid OTP.")
            res.status = 406
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
            handleOtpSuccess(responseJson)
          } else {
            throw responseJson;
          }
        } catch (error) {

          console.log("kyc/aadhaar-submit-otp error: ", error);
          handleOtpError(error, responseJson)
        }
      })
      .catch((error) => {
        handleAPIErrorWithRetry(error)
      });
  };

  return (
    <>
    {delayedResponseText ? <InfoCard info={delayedResponseText} icon="beenhere" color={COLORS.primary}/> : <></>}
      <PrimaryButton
        accessibilityLabel={"AadhaarVerifyBtn"}
        title={loading ? "Verifying" : "Continue"}
        disabled={props.disabled}
        loading={loading}
        onPress={() => {
          goForFetch();
        }}
      />
    </>
  );
};

export default AadhaarVerifyApi;
