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
import analytics from "@react-native-firebase/analytics";
import { putBackendData } from "../../services/employees/employeeServices";

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
    console.tron.log("bankSlice: ", bankSlice);
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
        console.tron.log("kyc/bank-verify-account res: ", res);
        if (props.type !== "KYC") {
          navigation.navigate("BankConfirm");
        }
        analytics().logEvent("Bank_Verify_Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        setLoading(false);
      })
      .catch((error) => {
        dispatch(addVerifyStatus("ERROR"));
        showToast(error?.message, "error");
        analytics().logEvent("Bank_Verify_Error", {
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
