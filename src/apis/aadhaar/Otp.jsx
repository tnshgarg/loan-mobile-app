import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addSubmitOTPtxnId,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/aadhaarSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  generateAadhaarOTP
} from "../../queries/onboarding/aadhaar";
import { putBackendData } from "../../services/employees/employeeServices";
import { showToast } from "../../components/atoms/Toast";

const AadhaarOtpApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [submitOTPtxnId, setSubmitOTPtxnId] = useState(
    aadhaarSlice?.submitOTPtxnId
  );
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    aadhaarSlice?.verifyTimestamp
  );
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  useEffect(() => {
    dispatch(addSubmitOTPtxnId(submitOTPtxnId));
  }, [submitOTPtxnId]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
    return () => {};
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
    return () => {};
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const { mutateAsync: generateAadhaarOTPMutateAsync } = generateAadhaarOTP();

  const backendPush = async ({ verifyMsg, verifyStatus, verifyTimestamp }) => {
    
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);

    const body = {
      unipeEmployeeId: unipeEmployeeId,
      data: aadhaarSlice?.data,
      number: aadhaarSlice?.number,
      verifyMsg: verifyMsg,
      verifyStatus: verifyStatus,
      verifyTimestamp: verifyTimestamp,
      campaignId: campaignId,
    };

    const response = await putBackendData({ data: body, xpath: "aadhaar", token: token });
    const responseJson = response?.data;

    console.log("responseJson: ", responseJson);

    if (responseJson.status === 200) {
      if (verifyStatus === "INPROGRESS_OTP") {
        dispatch(resetTimer());
        if (props?.type !== "KYC") {
          navigation.navigate("AadhaarVerify");
        }
        showToast("OTP sent to AADHAAR registered mobile number");
      }
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }

    setLoading(false);
  };

  const goForFetch = () => {
    setLoading(true);
    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }
    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: {},
        number: aadhaarSlice?.number,
        campaignId: campaignId,
        verifyMsg: "Attempted by User",
        verifyStatus: "ATTEMPTED",
        verifyTimestamp: Date.now(),
      },
      xpath: "aadhaar",
      token: token,
    })
      .then((res) => {
        let responseJson = res?.data;
        console.log("responseJson: ", responseJson);
        if (responseJson?.status == "400") {
          Alert.alert("Error", responseJson?.message);
          Analytics.trackEvent("Aadhaar|Otp|Duplicate", {
            unipeEmployeeId: unipeEmployeeId,
          });
          setLoading(false);
        } else {
          console.log("start: ", Date.now());
          generateAadhaarOTPMutateAsync({
            data: props.data,
          })
            .then((res) => {
              const responseJson = res?.data;
              console.log("responseJson: ", responseJson);
              try {
                console.log("end: ", Date.now());
                if (responseJson?.status == "200") {
                  switch (responseJson?.data?.code) {
                    case "1001":
                      setSubmitOTPtxnId(responseJson?.data?.transaction_id);
                      backendPush({
                        verifyMsg: "OTP sent to User",
                        verifyStatus: "INPROGRESS_OTP",
                        verifyTimestamp: responseJson?.timestamp,
                      });
                      Analytics.trackEvent("Aadhaar|Otp|Success", {
                        unipeEmployeeId: unipeEmployeeId,
                      });
                      break;
                    default:
                      backendPush({
                        verifyMsg: `Unsupported Data Code : ${responseJson?.data?.message}`,
                        verifyStatus: "ERROR",
                        verifyTimestamp: verifyTimestamp,
                      });
                      Alert.alert("Error", responseJson?.data?.message);
                      Analytics.trackEvent("Aadhaar|Otp|Error", {
                        unipeEmployeeId: unipeEmployeeId,
                        error: `Unsupported Data Code : ${responseJson?.data?.message}`,
                      });
                      break;
                  }
                } else if (responseJson?.error?.message) {
                  backendPush({
                    verifyMsg: `Unsupported Status Code : ${responseJson?.error?.message}`,
                    verifyStatus: "ERROR",
                    verifyTimestamp: verifyTimestamp,
                  });
                  Alert.alert("Error", responseJson?.error?.message);
                  Analytics.trackEvent("Aadhaar|Otp|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                    error: `Unsupported Status Code : ${responseJson?.error?.message}`,
                  });
                } else {
                  backendPush({
                    verifyMsg: `Unsupported Data/Status Code : ${responseJson?.message}`,
                    verifyStatus: "ERROR",
                    verifyTimestamp: verifyTimestamp,
                  });
                  Alert.alert("Error", responseJson?.message);
                  Analytics.trackEvent("Aadhaar|Otp|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                    error: `Unsupported Data/Status Code : ${responseJson?.message}`,
                  });
                }
              } catch (error) {
                backendPush({
                  verifyMsg: `Try Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", JSON.stringify(error));
                Analytics.trackEvent("Aadhaar|Otp|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: `Try Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
                });
              }
            })
            .catch((error) => {
              backendPush({
                verifyMsg: `generateAadhaarOTP API Catch Error: ${JSON.stringify(error)}`,
                verifyStatus: "ERROR",
                verifyTimestamp: verifyTimestamp,
              });
              Alert.alert("Error", JSON.stringify(error));
              Analytics.trackEvent("Aadhaar|Otp|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: `generateAadhaarOTP API Catch Error: ${JSON.stringify(error)}`,
              });
            });
        }
      })
      .catch((error) => {
        console.log("ERROR: ", JSON.stringify(error));
        Alert.alert("Error", JSON.stringify(error));
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
