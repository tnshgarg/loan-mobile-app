import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/licenseSlice";
import { licenseBackendPush } from "../../helpers/BackendPush";
import { OG_API_TEST_KEY } from "@env";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";

const Verify = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const licenseSlice = useSelector((state) => state.license);
  const [data, setData] = useState(licenseSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(licenseSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(licenseSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    licenseSlice?.verifyTimestamp
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
    console.log("licenseSlice : ", licenseSlice);
    if (backendPush) {
      licenseBackendPush({
        id: id,
        data: data,
        number: licenseSlice?.number,
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
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_TEST_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    };

    fetch(props.url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1000":
                setData(responseJson["data"]["driving_license_data"]);
                setVerifyMsg("To be confirmed by User");
                setVerifyStatus("PENDING");
                setVerifyTimestamp(responseJson["timestamp"]);
                setBackendPush(true);
                Analytics.trackEvent("Licence|Verify|Success", {
                  userId: id,
                });
                navigation.navigate("Documents", {
                  screen: "Driving License",
                  params: {
                    screen: "Confirm",
                  },
                });
                break;

              case "1001":
                setVerifyMsg(responseJson["data"]["message"]);
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson["data"]["message"]);
                Analytics.trackEvent("Licence|Verify|Error", {
                  userId: id,
                  error: responseJson["data"]["message"],
                });
                break;
            }
          } else if (responseJson["error"]) {
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["error"]["message"]);
            Analytics.trackEvent("Licence|Verify|Error", {
              userId: id,
              error: responseJson["error"]["message"],
            });
          } else {
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
            Alert.alert("Error", responseJson["message"]);
            Analytics.trackEvent("Licence|Verify|Error", {
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
          Analytics.trackEvent("Licence|Verify|Error", {
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
        Analytics.trackEvent("Licence|Verify|Error", {
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

export default Verify;
