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
} from "../../store/slices/panSlice";
import { KYC_PAN_VERIFY_API_URL } from "../../services/employees/endpoints";
import { panBackendPush } from "../../helpers/BackendPush";
import ApiView from "../ApiView";
import Analytics from "appcenter-analytics";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const panSlice = useSelector((state) => state.pan);
  const [data, setData] = useState(panSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    panSlice?.verifyTimestamp
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
    console.log("PanVerifyApi panSlice: ", panSlice);
    if (backendPush) {
      panBackendPush({
        id: id,
        data: data,
        number: panSlice?.number,
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
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    };

    fetch(KYC_PAN_VERIFY_API_URL, options)
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1000":
                const names = ["first", "middle", "last"];
                responseJson["data"]["pan_data"]["name"] = names
                  .filter(k => responseJson["data"]["pan_data"][`${k}_name`])
                  .map((k) => responseJson["data"]["pan_data"][`${k}_name`]).join(" ");
                console.log("PAN fetched data: ", responseJson);
                setData(responseJson["data"]["pan_data"]);
                setVerifyMsg("To be confirmed by User");
                setVerifyStatus("PENDING");
                setVerifyTimestamp(responseJson["timestamp"]);
                Analytics.trackEvent("PanVerify-getPanData-Success", {
                  userId: id,
                });
                setBackendPush(true);
                {
                  props.type == "KYC"
                    ? navigation.navigate("KYC", {
                        screen: "PAN",
                        params: {
                          screen: "Confirm",
                        },
                      })
                    : navigation.navigate("PanConfirm");
                }
                break;
              default:
                setVerifyMsg(responseJson["data"]["message"]);
                Analytics.trackEvent("PanVerify-getPanData-Error", {
                  userId: id,
                  error: responseJson["data"]["message"],
                });
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson["data"]["message"]);
            }
          } else if (responseJson?.error?.message) {
            setVerifyMsg(responseJson["error"]["message"]);
            Analytics.trackEvent("PanVerify-getPanData-Error", {
              userId: id,
              error: responseJson["error"]["message"],
            });
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["error"]["message"]);
          } else {
            setVerifyMsg(responseJson["message"]);
            Analytics.trackEvent("PanVerify-getPanData-Error", {
              userId: id,
              error: responseJson["message"],
            });
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["message"]);
          }
        } catch (error) {
          console.log("Error: ", error);
          setVerifyMsg(error);
          Analytics.trackEvent("PanVerify-getPanData-Error", {
            userId: id,
            error: error,
          });
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setVerifyMsg(error);
        Analytics.trackEvent("PanVerify-getPanData-Error", {
          userId: id,
          error: error,
        });
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", error);
      });
  };

  return (
    <ApiView
      disabled={props.disabled}
      loading={loading}
      goForFetch={goForFetch}
      style={props.style}
    />
  );
};

export default PanVerifyApi;
