import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { licenseBackendPush } from "../../helpers/BackendPush";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { OG_API_KEY } from "../../services/constants";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/licenseSlice";

const Verify = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const licenseSlice = useSelector((state) => state.license);
  const [data, setData] = useState(licenseSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(licenseSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(licenseSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    licenseSlice?.verifyTimestamp
  );
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
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
        data: {
          unipeEmployeeId: unipeEmployeeId,
          data: data,
          number: licenseSlice?.number,
          verifyMsg: verifyMsg,
          verifyStatus: verifyStatus,
          verifyTimestamp: verifyTimestamp,
          campaignId: campaignId,
        },
        token: token,
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
                Analytics.trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  component: "Licence",
                  action: "Verify",
                  status: "Success",
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
                Analytics.trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  component: "Licence",
                  action: "Verify",
                  status: "Error",
                  error: responseJson["data"]["message"],
                });
                break;
            }
          } else if (responseJson["error"]) {
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["error"]["message"]);
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Licence",
              action: "Verify",
              status: "Error",
              error: responseJson["error"]["message"],
            });
          } else {
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
            Alert.alert("Error", responseJson["message"]);
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Licence",
              action: "Verify",
              status: "Error",
              error: responseJson["message"],
            });
          }
        } catch (error) {
          console.log("Try Catch Error: ", error.message);
          setVerifyMsg(error.message);
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", JSON.stringify(error));
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "Licence",
            action: "Verify",
            status: "Error",
            error: JSON.stringify(error),
          });
        }
      })
      .catch((error) => {
        console.log("Fetch Catch Error: ", error.message);
        setVerifyMsg(error.message);
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", JSON.stringify(error));
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Licence",
          action: "Verify",
          status: "Error",
          error: JSON.stringify(error),
        });
      });
  };

  return (
    <PrimaryButton
      title={loading ? strings.verifying : strings.continue}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default Verify;
