import { OG_API_KEY } from "@env";
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
import { KYC_AADHAAR_SUBMIT_OTP_API_URL } from "../../services/constants";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";

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
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const backendPush = ({ data, verifyMsg, verifyStatus, verifyTimestamp }) => {
    console.log("AadhaarVerifyApi aadhaarSlice: ", aadhaarSlice);
    setData(data);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);
    aadhaarBackendPush({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: data,
        number: aadhaarSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
        campaignId: campaignId,
      },
      token: token,
    });
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

    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(KYC_AADHAAR_SUBMIT_OTP_API_URL, options)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson: ", responseJson);
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
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
                console.log("AADHAAR fetched data: ", responseJson);
                backendPush({
                  data: responseJson["data"]["aadhaar_data"],
                  verifyMsg: "OTP validated by User",
                  verifyStatus: "PENDING",
                  verifyTimestamp: responseJson["timestamp"],
                });
                Analytics.trackEvent("Aadhaar|Verify|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
                props.setVerified(true);
                {
                  props.type == "KYC"
                    ? navigation.navigate("KYC", {
                        screen: "AADHAAR",
                        params: {
                          screen: "Confirm",
                        },
                      })
                    : navigation.navigate("AadhaarConfirm");
                }
                break;
              default:
                backendPush({
                  data: data,
                  verifyMsg: responseJson["data"]["message"],
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", responseJson["data"]["message"]);
                Analytics.trackEvent("Aadhaar|Verify|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: responseJson["data"]["message"],
                });
            }
          } else if (responseJson?.error?.message) {
            backendPush({
              data: data,
              verifyMsg: responseJson["error"]["message"],
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", responseJson["error"]["message"]);
            Analytics.trackEvent("Aadhaar|Verify|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: responseJson["error"]["message"],
            });
          } else {
            backendPush({
              data: data,
              verifyMsg: responseJson["message"],
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", responseJson["message"]);
            Analytics.trackEvent("Aadhaar|Verify|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: responseJson["message"],
            });
          }
        } catch (error) {
          backendPush({
            data: data,
            verifyMsg: error.toString(),
            verifyStatus: "ERROR",
            verifyTimestamp: verifyTimestamp,
          });
          Alert.alert("Error", error.toString());
          Analytics.trackEvent("Aadhaar|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        }
      })
      .catch((error) => {
        backendPush({
          data: data,
          verifyMsg: error.toString(),
          verifyStatus: "ERROR",
          verifyTimestamp: verifyTimestamp,
        });
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Aadhaar|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
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
