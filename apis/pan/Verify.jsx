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
import { KYC_PAN_VERIFY_API_URL } from "../../services/constants";
import { panBackendPush } from "../../helpers/BackendPush";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { updatePan, verifyPan } from "../../queries/onboarding/pan";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const panSlice = useSelector((state) => state.pan);
  const [data, setData] = useState(panSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    panSlice?.verifyTimestamp
  );

  const { mutateAsync: updatePanMutateAsync } = updatePan();
  const { mutateAsync: verifyPanMutateAsync } = verifyPan();

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
    console.log("PanVerifyApi panSlice: ", panSlice);
    setData(data);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);
    updatePanMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: data,
        number: panSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      },
      token: token,
    });
    setLoading(false);
  };

  const goForFetch = () => {
    setLoading(true);

    verifyPanMutateAsync({ data: props.data })
      .then((res) => {
        const responseJson = res.data;
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1000":
                const names = ["first", "middle", "last"];
                responseJson["data"]["pan_data"]["name"] = names
                  .filter((k) => responseJson["data"]["pan_data"][`${k}_name`])
                  .map((k) => responseJson["data"]["pan_data"][`${k}_name`])
                  .join(" ");
                console.log("PAN fetched data: ", responseJson);
                backendPush({
                  data: responseJson["data"]["pan_data"],
                  verifyMsg: "To be confirmed by User",
                  verifyStatus: "PENDING",
                  verifyTimestamp: responseJson["timestamp"],
                });
                Analytics.trackEvent("Pan|Verify|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
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
                backendPush({
                  data: data,
                  verifyMsg: responseJson["data"]["message"],
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", responseJson["data"]["message"]);
                Analytics.trackEvent("Pan|Verify|Error", {
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
            Analytics.trackEvent("Pan|Verify|Error", {
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
            Analytics.trackEvent("Pan|Verify|Error", {
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
          Analytics.trackEvent("Pan|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        }
      })
      .catch((error) => {
        console.log("Fetch Catch Error: ", error.toString());
        backendPush({
          data: data,
          verifyMsg: error.toString(),
          verifyStatus: "ERROR",
          verifyTimestamp: verifyTimestamp,
        });
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Pan|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  return (
    <PrimaryButton
      accessibilityLabel={"PanVerifyBtn"}
      title={loading ? "Verifying" : "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default PanVerifyApi;
