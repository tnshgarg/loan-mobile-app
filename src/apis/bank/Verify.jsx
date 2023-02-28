import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addBankName,
  addAccountHolderName,
  addBranchName,
  addBranchCity,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/bankSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { verifyBank } from "../../queries/onboarding/bank";
import { putBackendData } from "../../services/employees/employeeServices";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const bankSlice = useSelector((state) => state.bank);
  const data = useSelector((state) => state.bank.data);
  const [bankName, setBankName] = useState(bankSlice?.data?.bankName);
  const [branchName, setBranchName] = useState(bankSlice?.data?.bankBranch);
  const [branchCity, setBranchCity] = useState(bankSlice?.data?.branchCity);
  const [accountHolderName, setAccountHolderName] = useState(
    bankSlice?.data?.accountHolderName
  );
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    bankSlice?.verifyTimestamp
  );
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const { mutateAsync: verifyBankMutateAsync } = verifyBank();

  useEffect(() => {
    dispatch(addBankName(bankName));
  }, [bankName]);

  useEffect(() => {
    dispatch(addAccountHolderName(accountHolderName));
  }, [accountHolderName]);

  useEffect(() => {
    dispatch(addBranchName(branchName));
  }, [branchName]);

  useEffect(() => {
    dispatch(addBranchCity(branchCity));
  }, [branchCity]);

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
  }, [verifyTimestamp]);

  const backendPush = async ({
    verifyMsg,
    verifyStatus,
    verifyTimestamp,
    accountHolderName,
    bankName,
    branchName,
    branchCity,
  }) => {

    setAccountHolderName(accountHolderName);
    setBankName(bankName);
    setBranchName(branchName);
    setBranchCity(branchCity);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      data: {
        accountNumber: data.accountNumber,
      },
      verifyMsg: verifyMsg,
      verifyStatus: verifyStatus,
      verifyTimestamp: verifyTimestamp,
      campaignId: campaignId,
    };

    const response = await putBackendData({ data: payload, xpath: "bank", token: token });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
      if (verifyStatus === "INPROGRESS_CONFIRMATION") {
        if (props?.type !== "KYC") {
          navigation.navigate("BankConfirm");
        }
      }
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }
    
    setLoading(false);
  };

  const goForFetch = () => {
    setLoading(true);

    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: {
          accountNumber: data.accountNumber,
        },
        verifyMsg: "Attempted by User",
        verifyStatus: "ATTEMPTED",
        verifyTimestamp: Date.now(),
        campaignId: campaignId,
      },
      xpath: "bank",
      token: token,
    })
      .then((res) => {
        const responseJson = res?.data;
        console.log("responseJson: ", responseJson);
        if (responseJson?.status == "400") {
          Alert.alert("Error", responseJson?.message);
          Analytics.trackEvent("Bank|Verify|Duplicate", {
            unipeEmployeeId: unipeEmployeeId,
          });
          setLoading(false);
        } else {
          verifyBankMutateAsync({ data: props.data })
            .then((res) => {
              const responseJson = res?.data;
              console.log("responseJson: ", responseJson);
              try {
                if (responseJson["status"] == "200") {
                  switch (responseJson["data"]["code"]) {
                    case "1000":
                      backendPush({
                        verifyMsg: "To be confirmed by User",
                        verifyStatus: "INPROGRESS_CONFIRMATION",
                        verifyTimestamp: responseJson["timestamp"],
                        accountHolderName:
                          responseJson["data"]["bank_account_data"]["name"],
                        bankName:
                          responseJson["data"]["bank_account_data"][
                            "bank_name"
                          ],
                        branchName:
                          responseJson["data"]["bank_account_data"]["branch"],
                        branchCity:
                          responseJson["data"]["bank_account_data"]["city"],
                      });
                      Analytics.trackEvent("Bank|Verify|Success", {
                        unipeEmployeeId: unipeEmployeeId,
                      });
                      break;
                    default:
                      backendPush({
                        verifyMsg: responseJson["data"]["message"],
                        verifyStatus: "ERROR",
                        verifyTimestamp: verifyTimestamp,
                      });
                      Alert.alert("Error", responseJson["data"]["message"]);
                      Analytics.trackEvent("Bank|Verify|Error", {
                        unipeEmployeeId: unipeEmployeeId,
                        error: responseJson["data"]["message"],
                      });
                      break;
                  }
                } else {
                  setVerifyStatus("ERROR");
                  if (responseJson["error"]) {
                    backendPush({
                      verifyMsg: responseJson["error"],
                      verifyStatus: "ERROR",
                      verifyTimestamp: verifyTimestamp,
                    });
                    Alert.alert(
                      "Error",
                      responseJson["error"]["metadata"]["fields"]
                        .map((item) => item["message"])
                        .join("\n")
                    );
                    Analytics.trackEvent("Bank|Verify|Error", {
                      unipeEmployeeId: unipeEmployeeId,
                      error: responseJson["error"]["metadata"]["fields"]
                        .map((item) => item["message"])
                        .join("\n"),
                    });
                  } else {
                    backendPush({
                      verifyMsg: responseJson["message"],
                      verifyStatus: "ERROR",
                      verifyTimestamp: verifyTimestamp,
                    });
                    Alert.alert("Error", responseJson["message"]);
                    Analytics.trackEvent("Bank|Verify|Error", {
                      unipeEmployeeId: unipeEmployeeId,
                      error: responseJson["messsage"],
                    });
                  }
                }
              } catch (error) {
                backendPush({
                  verifyMsg: `Try Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", JSON.stringify(error));
                Analytics.trackEvent("Bank|Verify|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: `Try Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
                });
              }
          })
          .catch((error) => {
            backendPush({
              verifyMsg: `verifyBank API Catch Error: ${JSON.stringify(error)}`,
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", JSON.stringify(error));
            Analytics.trackEvent("Bank|Verify|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: `verifyBank API Catch Error: ${JSON.stringify(error)}`,
            });
          });
        }
      })
      .catch((error) => {
        console.log("Error: ", JSON.stringify(error));
        Alert.alert("Error", JSON.stringify(error));
      });
  };

  return (
    <PrimaryButton
      accessibilityLabel={"BankFormBtn"}
      title={loading ? "Verifying" : "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
  
};

export default BankVerifyApi;
