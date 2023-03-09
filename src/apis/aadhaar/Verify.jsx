import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addData,
  addVerifyStatus,
} from "../../store/slices/aadhaarSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { putBackendData } from "../../services/employees/employeeServices";

const AadhaarVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [data, setData] = useState(aadhaarSlice?.data);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);

  useEffect(() => {
    dispatch(addData(data));
    return () => {};
  }, [data]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
    return () => {};
  }, [verifyStatus]);

  const goForFetch = () => {
    setLoading(true);
    console.log("aadhaarSlice: ", aadhaarSlice);

    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        otp: props.data.otp,
        campaignId: campaignId,
        provider: 'ongrid'
      },
      xpath: "kyc/aadhaar-submit-otp",
      token: token,
    })
      .then((res) => {
        console.log("kyc/aadhaar-submit-otp res: ", res);
        const responseJson = res?.data;
        console.log("kyc/aadhaar-submit-otp responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            setData(responseJson?.body?.data);
            setVerifyStatus(responseJson?.body?.verifyStatus);
            props.setVerified(true);
            if (props.type === "KYC") {
              navigation.navigate("KYC", {
                  screen: "AADHAAR",
                  params: {
                    screen: "Confirm",
                  },
              });
            } else {
              navigation.navigate("AadhaarConfirm");
            }
            Analytics.trackEvent("Aadhaar|Verify|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            setLoading(false);
          } else {
            throw responseJson;
          }
        } catch (error) {
          setVerifyStatus("ERROR");
          Alert.alert("submitAadhaarOTP API Catch Error", JSON.stringify(error));
          Analytics.trackEvent("Aadhaar|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `submitAadhaarOTP API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        setVerifyStatus("ERROR");
        Alert.alert("submitAadhaarOTP Catch Error", JSON.stringify(error));
        Analytics.trackEvent("Aadhaar|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `submitAadhaarOTP Catch Error: ${JSON.stringify(error)}`,
        });
        setLoading(false);
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
