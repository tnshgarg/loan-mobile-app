import { OG_API_KEY } from "@env";
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
  fetchAadhaarData,
  AadhaarBackendPush,
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

  const { mutateAsync: aadhaarBackendMutateAsync } = AadhaarBackendPush();

  const { mutateAsync: fetchAadhaarMutate } = fetchAadhaarData();

  const backendPush = ({ verifyMsg, verifyStatus, verifyTimestamp }) => {
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);

    aadhaarBackendMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: aadhaarSlice?.data,
        number: aadhaarSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      },
      token: token,
    });
    setLoading(false);
  };

  const goForFetch = async () => {
    setLoading(true);
    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }

    fetchAadhaarMutate({
      data: props.data,
    })
      .then((res) => {
        try {
          if (res.data["status"] == "200") {
            switch (res.data["data"]["code"]) {
              case "1001":
                setSubmitOTPtxnId(res.data["data"]["transaction_id"]);
                backendPush({
                  verifyMsg: "OTP sent to User",
                  verifyStatus: "PENDING",
                  verifyTimestamp: res.data["timestamp"],
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
                  verifyMsg: res.data["data"]["message"],
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", res.data["data"]["message"]);
                Analytics.trackEvent("Aadhaar|Otp|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: res.data["data"]["message"],
                });
                break;
            }
          } else if (res.data?.error?.message) {
            backendPush({
              verifyMsg: res.data["error"]["message"],
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", res.data["error"]["message"]);
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: res.data["error"]["message"],
            });
          } else {
            backendPush({
              verifyMsg: res.data["message"],
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", res.data["message"]);
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: res.data["message"],
            });
          }
        } catch (error) {
          backendPush({
            verifyMsg: error.toString(),
            verifyStatus: "ERROR",
            verifyTimestamp: verifyTimestamp,
          });
          Alert.alert("Error", error.toString());
          Analytics.trackEvent("Aadhaar|Otp|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        }
      })
      .catch((error) => {
        backendPush({
          verifyMsg: error.toString(),
          verifyStatus: "ERROR",
          verifyTimestamp: verifyTimestamp,
        });
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Aadhaar|Otp|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
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
