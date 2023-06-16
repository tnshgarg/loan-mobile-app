import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { strings } from "../../helpers/Localization";
import { useVerifyAadhaarOtpMutation } from "../../store/apiSlices/aadhaarApi";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import Analytics, {InteractionTypes} from "../../helpers/analytics/commonAnalytics";
import { getBackendData } from "../../services/employees/employeeServices";
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
        title={loading ? "Verifying" : strings.continue}
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
