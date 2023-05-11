import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
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
import { useVerifyBankMutation } from "../../store/apiSlices/bankApi";
import { showToast } from "../../components/atoms/Toast";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  const bankSlice = useSelector((state) => state.bank);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const [verifyBank] = useVerifyBankMutation();
  const goForFetch = () => {
    setLoading(true);
    console.log("bankSlice: ", bankSlice);
    const data = {
      unipeEmployeeId: unipeEmployeeId,
      accountHolderName: bankSlice?.data?.accountHolderName,
      accountNumber: bankSlice?.data?.accountNumber,
      ifsc: bankSlice?.data?.ifsc,
      upi: bankSlice?.data?.upi,
      campaignId: campaignId,
      provider: "ongrid",
    };
    verifyBank(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/bank-verify-account res: ", res);
        const responseJson = res?.data;
        console.log("kyc/bank-verify-account responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            dispatch(
              addAccountHolderName(responseJson?.body?.data?.accountHolderName)
            );
            dispatch(addBankName(responseJson?.body?.data?.bankName));
            dispatch(addBranchName(responseJson?.body?.data?.branchName));
            dispatch(addBranchCity(responseJson?.body?.data?.branchCity));
            dispatch(addVerifyStatus(responseJson?.body?.verifyStatus));
            if (props.type !== "KYC") {
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
          dispatch(addVerifyStatus("ERROR"));
          showToast(error?.message, "error");
          Analytics.trackEvent("Bank|Verify|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: `verifyBankAccount API Catch Error: ${
              error.message
            }, ${JSON.stringify(res)}`,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(addVerifyStatus("ERROR"));
        showToast(error?.message, "error");
        Analytics.trackEvent("Bank|Verify|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `verifyBankAccount Catch Error: ${error.message}`,
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
