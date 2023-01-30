import { OG_API_KEY } from "@env";
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
import { KYC_BANK_VERIFY_API_URL } from "../../services/constants";
import { bankBackendPush } from "../../helpers/BackendPush";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { updateBank, verifyBank } from "../../queries/onboarding/bank";
import { putBackendData } from "../../services/employees/employeeServices";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("Mock api URl", KYC_BANK_VERIFY_API_URL);

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

  const { mutateAsync: updateBankMutateAsync } = updateBank();
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
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  const backendPush = ({
    verifyMsg,
    verifyStatus,
    verifyTimestamp,
    accountHolderName,
    bankName,
    branchName,
    branchCity,
  }) => {
    console.log("BankVerifyApi bankSlice: ", bankSlice);
    setAccountHolderName(accountHolderName);
    setBankName(bankName);
    setBranchName(branchName);
    setBranchCity(branchCity);
    setVerifyMsg(verifyMsg);
    setVerifyStatus(verifyStatus);
    setVerifyTimestamp(verifyTimestamp);

    updateBankMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: {
          accountNumber: data.accountNumber,
        },
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

    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: {
          accountHolderName: accountHolderName,
          accountNumber: data.accountNumber,
          bankName: bankName,
          branchName: branchName,
          branchCity: branchCity,
          ifsc: data.ifsc,
          upi: data.upi,
        },
        campaignId: campaignId,
        verifyMsg: "Attempted by User",
        verifyStatus: "ATTEMPTED",
        verifyTimestamp: Date.now(),
      },
      xpath: "bank",
      token: token,
    })
      .then((res) => {
        let responseJson = res?.data;
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
              const responseJson = res.data;
              try {
                if (responseJson["status"] == "200") {
                  switch (responseJson["data"]["code"]) {
                    case "1000":
                      backendPush({
                        verifyMsg: "To be confirmed by User",
                        verifyStatus: "PENDING",
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
                      {
                        props.type == "KYC"
                          ? navigation.navigate("KYC", {
                              screen: "BANK",
                              params: {
                                screen: "Confirm",
                              },
                            })
                          : navigation.navigate("BankConfirm");
                      }
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
                  verifyMsg: error.toString(),
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", error.toString());
                Analytics.trackEvent("Bank|Verify|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: error.toString(),
                });
              }
            })
            .catch((error) => {
              backendPush({
                verifyMsg: error.toString(),
                verifyStatus: "ERROR",
                verifyTimestamp: verifyTimestamp,
              });
              Alert.alert("Error", error.toString());
              Analytics.trackEvent("Bank|Verify|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: error.toString(),
              });
            });
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        Alert.alert("Error", err);
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
