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
import {
  useGetBankQuery,
  useVerifyBankMutation,
} from "../../store/apiSlices/bankApi";
import { showToast } from "../../components/atoms/Toast";
import analytics from "@react-native-firebase/analytics";
import { putBackendData } from "../../services/employees/employeeServices";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const [verifyBank] = useVerifyBankMutation();
  const goForFetch = () => {
    setLoading(true);

    const data = {
      unipeEmployeeId: unipeEmployeeId,
      accountHolderName: props.accountHolderName,
      accountNumber: props.accountNumber,
      ifsc: props.ifsc,
      upi: props.upi,
      campaignId: campaignId,
      provider: "ongrid",
    };
    verifyBank(data)
      .unwrap()
      .then((res) => {
        console.log("kyc/bank-verify-account res: ", res);
        if (props.type !== "KYC") {
          navigation.navigate("BankConfirm");
        }
        analytics().logEvent("Bank_Verify_Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        setLoading(false);
      })
      .catch(({ data, status }) => {
        dispatch(addVerifyStatus("ERROR"));
        console.log(data);
        showToast(data?.error?.message, "error");
        analytics().logEvent("Bank_Verify_Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: `verifyBankAccount Catch Error: ${data?.error?.message}`,
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
