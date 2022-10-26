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
import PrimaryButton from "../../components/PrimaryButton";
import Analytics from "appcenter-analytics";

const AadhaarVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const submitOTPtxnId = useSelector((state) => state.aadhaar.submitOTPtxnId);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [data, setData] = useState(aadhaarSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    aadhaarSlice?.verifyTimestamp
  );

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

  useEffect(() => {
    console.log("AadhaarVerifyApi aadhaarSlice : ", aadhaarSlice);
    if (backendPush) {
      aadhaarBackendPush({
        id: id,
        data: data,
        number: aadhaarSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      });
      setBackendPush(false);
      setLoading(false);
    }
  }, [backendPush]);

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
                setData(responseJson["data"]["aadhaar_data"]);
                setVerifyMsg("OTP validated by User");
                setVerifyStatus("PENDING");
                setVerifyTimestamp(responseJson["timestamp"]);
                setBackendPush(true);
                Analytics.trackEvent("Aadhaar|Verify|Success", {
                  userId: id,
                });
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
                setVerifyMsg(responseJson["data"]["message"]);
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson["data"]["message"]);
                Analytics.trackEvent("Aadhaar|Verify|Error", {
                  userId: id,
                  error: responseJson["data"]["message"],
                });
            }
          } else if (responseJson?.error?.message) {
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["error"]["message"]);
            Analytics.trackEvent("Aadhaar|Verify|Error", {
              userId: id,
              error: responseJson["error"]["message"],
            });
          } else {
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["message"]);
            Analytics.trackEvent("Aadhaar|Verify|Error", {
              userId: id,
              error: responseJson["message"],
            });
          }
        } catch (error) {
          console.log("Try Catch Error: ", error.toString());
          setVerifyMsg(error.toString());
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error.toString());
          Analytics.trackEvent("Aadhaar|Verify|Error", {
            userId: id,
            error: error.toString(),
          });
        }
      })
      .catch((error) => {
        console.log("Fetch Catch Error: ", error.toString());
        setVerifyMsg(error.toString());
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Aadhaar|Verify|Error", {
          userId: id,
          error: error.toString(),
        });
      });
  };

  return (
    <PrimaryButton
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
