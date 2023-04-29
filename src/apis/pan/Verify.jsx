import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addData,
  addVerifyStatus,
} from "../../store/slices/panSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { putBackendData } from "../../services/employees/employeeServices";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const panSlice = useSelector((state) => state.pan);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const goForFetch = () => {
    setLoading(true);
    console.log("panSlice: ", panSlice);

    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        panNumber: panSlice?.number,
        campaignId: campaignId,
        provider: 'ongrid'
      },
      xpath: "kyc/pan-fetch-details",
      token: token,
    })
      .then((res) => {
        console.log("kyc/pan-fetch-details res: ", res);
        const responseJson = res?.data;
        console.log("kyc/pan-fetch-details responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            dispatch(addData(responseJson?.body?.data));
            setLoading(false);
            Analytics.trackEvent("Pan|Verify|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            dispatch(addVerifyStatus(responseJson?.body?.verifyStatus));
            if (props.type !== "KYC") {
              navigation.navigate("PanConfirm");
            }
          } else {
            throw responseJson;
          }
        } catch (error) {
          dispatch(addVerifyStatus("ERROR"));
          Alert.alert("fetchPanDetails API Catch Error", JSON.stringify(error));
          Analytics.trackEvent("Pan|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `fetchPanDetails API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(addVerifyStatus("ERROR"));
        Alert.alert("fetchPanDetails Catch Error", JSON.stringify(error));
        Analytics.trackEvent("Pan|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `fetchPanDetails Catch Error: ${JSON.stringify(error)}`,
        });
        setLoading(false);
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
