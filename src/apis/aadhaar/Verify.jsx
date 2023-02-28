import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/aadhaarSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import {
  submitAadhaarOTP
} from "../../queries/onboarding/aadhaar";
import { putBackendData } from "../../services/employees/employeeServices";

const AadhaarVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const submitOTPtxnId = useSelector((state) => state.aadhaar.submitOTPtxnId);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [data, setData] = useState(aadhaarSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    aadhaarSlice?.verifyTimestamp
  );
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

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
    return () => {};
  }, [verifyTimestamp]);

  const { mutateAsync: submitAadhaarOTPMutateAsync } = submitAadhaarOTP();

  const backendPush = async ({ data, verifyMsg, verifyStatus, verifyTimestamp }) => {
    
    setData(data);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      data: data,
      number: aadhaarSlice?.number,
      verifyMsg: verifyMsg,
      verifyStatus: verifyStatus,
      verifyTimestamp: verifyTimestamp,
      campaignId: campaignId,
    };

    const response = await putBackendData({ data: payload, xpath: "aadhaar", token: token });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
      if (verifyStatus === "INPROGRESS_CONFIRMATION") {
        props.setVerified(true);
        if (props?.type !== "KYC") {
          navigation.navigate("AadhaarConfirm");
        }
      }
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }
    
    setLoading(false);
  };

  const goForFetch = () => {
    setLoading(true);

    const data = {
      otp: props.data.otp,
      include_xml: props.data.include_xml,
      share_code: props.data.share_code,
      transaction_id: submitOTPtxnId,
    };

    submitAadhaarOTPMutateAsync({ data })
      .then((res) => {
        const responseJson = res?.data;
        try {
          if (responseJson?.status == "200") {
            switch (responseJson?.data?.code) {
              case "1002":
                const names = [
                  "house",
                  "street",
                  "locality",
                  "sub_district",
                  "district",
                  "state",
                  "pincode",
                ];
                responseJson["data"]["aadhaar_data"]["address"] = names
                  .filter((k) => responseJson["data"]["aadhaar_data"][k])
                  .map((k) => responseJson["data"]["aadhaar_data"][k])
                  .join(", ");
                backendPush({
                  data: responseJson["data"]["aadhaar_data"],
                  verifyMsg: "OTP validated by User",
                  verifyStatus: "INPROGRESS_CONFIRMATION",
                  verifyTimestamp: responseJson?.timestamp,
                });
                Analytics.trackEvent("Aadhaar|Verify|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
                break;
              default:
                backendPush({
                  data: data,
                  verifyMsg: `Unsupported Data Code : ${responseJson?.data?.message}`,
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", responseJson?.data?.message);
                Analytics.trackEvent("Aadhaar|Verify|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: `Unsupported Data Code : ${responseJson?.data?.message}`,
                });
            }
          } else if (responseJson?.error?.message) {
            backendPush({
              data: data,
              verifyMsg: `Unsupported Status Code : ${responseJson?.error?.message}`,
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", responseJson?.error?.message);
            Analytics.trackEvent("Aadhaar|Verify|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: `Unsupported Status Code : ${responseJson?.error?.message}`,
            });
          } else {
            backendPush({
              data: data,
              verifyMsg: `Unsupported Data/Status Code : ${responseJson?.message}`,
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", responseJson?.message);
            Analytics.trackEvent("Aadhaar|Verify|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: `Unsupported Data/Status Code : ${responseJson?.message}`,
            });
          }
        } catch (error) {
          backendPush({
            data: data,
            verifyMsg: `Try Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
            verifyStatus: "ERROR",
            verifyTimestamp: verifyTimestamp,
          });
          Alert.alert("Error", JSON.stringify(error));
          Analytics.trackEvent("Aadhaar|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `Try Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
        }
      })
      .catch((error) => {
        backendPush({
          data: data,
          verifyMsg: `submitAadhaarOTP API Catch Error: ${JSON.stringify(error)}`,
          verifyStatus: "ERROR",
          verifyTimestamp: verifyTimestamp,
        });
        Alert.alert("Error", JSON.stringify(error));
        Analytics.trackEvent("Aadhaar|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `submitAadhaarOTP API Catch Error: ${JSON.stringify(error)}`,
        });
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
