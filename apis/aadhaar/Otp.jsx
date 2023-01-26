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
  generateAadhaarOTP,
  updateAadhaar,
} from "../../queries/onboarding/aadhaar";

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
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const { mutateAsync: updateAadhaarMutateAsync, data: updateAadhaarData } =
    updateAadhaar();

  const { mutateAsync: generateAadhaarOTPMutateAsync } = generateAadhaarOTP();

  const backendPush = async ({ verifyMsg, verifyStatus, verifyTimestamp }) => {
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);

    let retRes = {};

    updateAadhaarMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: aadhaarSlice?.data,
        number: aadhaarSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
        campaignId: campaignId,
      },
      token: token,
    })
      .then((res) => {
        console.log("res: " + res);
        retRes = res;
      })
      .catch((err) => console.log(err));

    setLoading(false);
    return retRes;
  };

  const goForFetch = async () => {
    setLoading(true);
    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }

    const res = await backendPush({
      verifyMsg: "Confirmed by User",
      verifyStatus: "ATTEMPTED",
      verifyTimestamp: Date.now(),
    });

    console.log("res: " + JSON.stringify(res));

    const responseJson = res?.data;
    console.log(responseJson);
    if (responseJson?.status == "400") {
      Alert.alert("Error", responseJson?.data?.message);
      Analytics.trackEvent("Check|Aadhaar|Exists", {
        unipeEmployeeId: unipeEmployeeId,
      });
    } else {
      console.log("first");
      generateAadhaarOTPMutateAsync({
        data: props.data,
      })
        .then((res) => {
          try {
            const responseJson = res?.data;
            console.log(responseJson);
            if (responseJson?.status == "200") {
              switch (responseJson?.data?.code) {
                case "1001":
                  setSubmitOTPtxnId(responseJson?.data?.transaction_id);
                  backendPush({
                    verifyMsg: "OTP sent to User",
                    verifyStatus: "PENDING",
                    verifyTimestamp: responseJson?.timestamp,
                  });
                  dispatch(resetTimer());
                  Analytics.trackEvent("Aadhaar|Otp|Success", {
                    unipeEmployeeId: unipeEmployeeId,
                  });
                  {
                    props.type == "KYC"
                      ? navigation.navigate("KYC", {
                          screen: "AADHAAR",
                          params: {
                            screen: "Verify",
                          },
                        })
                      : navigation.navigate("AadhaarVerify");
                  }
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
              verifyMsg: `Try Catch Error: ${error.toString()}, ${res.toString()}`,
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", error.toString());
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: `Try Catch Error: ${error.toString()}, ${res.toString()}`,
            });
          }
        })
        .catch((error) => {
          backendPush({
            verifyMsg: `generateAadhaarOTP API Catch Error: ${error.toString()}`,
            verifyStatus: "ERROR",
            verifyTimestamp: verifyTimestamp,
          });
          Alert.alert("Error", error.toString());
          Analytics.trackEvent("Aadhaar|Otp|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `generateAadhaarOTP API Catch Error: ${error.toString()}`,
          });
        });
    }
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
