import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addBankName,
  addAccountHolderName,
  addBranchName,
  addBranchCity,
  addVerifyStatus,
} from "../../store/slices/bankSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { putBackendData } from "../../services/employees/employeeServices";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const bankSlice = useSelector((state) => state.bank);
  const [bankName, setBankName] = useState(bankSlice?.data?.bankName);
  const [branchName, setBranchName] = useState(bankSlice?.data?.bankBranch);
  const [branchCity, setBranchCity] = useState(bankSlice?.data?.branchCity);
  const [accountHolderName, setAccountHolderName] = useState(
    bankSlice?.data?.accountHolderName
  );
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

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
    dispatch(addVerifyStatus(verifyStatus));
    return () => {};
  }, [verifyStatus]);

  const goForFetch = () => {
    setLoading(true);
    console.log("bankSlice: ", bankSlice);

    putBackendData({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        accountHolderName: accountHolderName,
        accountNumber: accountNumber,
        ifsc: ifsc,
        upi: upi,
        campaignId: campaignId,
        provider: 'ongrid'
      },
      xpath: "kyc/bank-verify-account",
      token: token,
    })
      .then((res) => {
        console.log("kyc/bank-verify-account res: ", res);
        const responseJson = res?.data;
        console.log("kyc/bank-verify-account responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            setAccountHolderName(responseJson?.data?.accountHolderName);
            setBankName(responseJson?.data?.bankName);
            setBranchName(responseJson?.data?.branchName);
            setBranchCity(responseJson?.data?.branchCity);
            setVerifyStatus(responseJson?.body?.verifyStatus);
            if (props.type === "KYC") {
              navigation.navigate("KYC", {
                  screen: "BANK",
                  params: {
                    screen: "Confirm",
                  },
              });
            } else {
              navigation.navigate("BankConfirm");
            }
            Analytics.trackEvent("Bank|Verify|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            setLoading(false);
          } else {
            throw responseJson;
          }
        } catch (error) {
          setVerifyStatus("ERROR");
          Alert.alert("verifyBankAccount API Catch Error", JSON.stringify(error));
          Analytics.trackEvent("Bank|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `verifyBankAccount API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        setVerifyStatus("ERROR");
        Alert.alert("verifyBankAccount Catch Error", JSON.stringify(error));
        Analytics.trackEvent("Bank|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `verifyBankAccount Catch Error: ${JSON.stringify(error)}`,
        });
        setLoading(false);
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
