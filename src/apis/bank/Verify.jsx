import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../../components/atoms/InfoCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { asyncTimeout } from "../../helpers/asyncTimer";
import { KYC_RETRY_WAIT_TIME } from "../../services/constants";
import { getBackendData } from "../../services/employees/employeeServices";
import { useVerifyBankMutation } from "../../store/apiSlices/bankApi";
import {
  addAccountHolderName,
  addBankName,
  addBranchCity,
  addBranchName,
  addVerifyStatus,
} from "../../store/slices/bankSlice";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [delayedResponseText, setDelayedResponseText] = useState("");

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const [verifyBank] = useVerifyBankMutation();
  const handleBankSuccess = (responseJson) => {
    dispatch(addAccountHolderName(responseJson?.body?.data?.accountHolderName));
    dispatch(addBankName(responseJson?.body?.data?.bankName));
    dispatch(addBranchName(responseJson?.body?.data?.branchName));
    dispatch(addBranchCity(responseJson?.body?.data?.branchCity));
    dispatch(addVerifyStatus(responseJson?.body?.verifyStatus));
    if (props.type !== "KYC") {
      navigation.navigate("BankConfirm");
    }
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "bank",
      action: "CONTINUE",
    });
    setLoading(false);
  };

  const handleBankError = (error, res) => {
    dispatch(addVerifyStatus("ERROR"));
    Alert.alert("verifyBankAccount API Catch Error", JSON.stringify(error));
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "bank",
      action: "ERROR",
      error: `verifyBankAccount API Catch Error: ${JSON.stringify(
        error
      )}, ${JSON.stringify(res)}`,
    });
    setLoading(false);
  };

  const handleAPIResponseDelay = async () => {
    setDelayedResponseText("We are still getting your details please wait....");
    await asyncTimeout(KYC_RETRY_WAIT_TIME);
    // TODO: replace with rtk-call
    getBackendData({
      params: { unipeEmployeeId: unipeEmployeeId },
      xpath: "bank",
      token: token,
    })
      .then(({ data: { body, status } }) => {
        if (status == 200 && body?.verifyStatus == "INPROGRESS_CONFIRMATION") {
          handleBankSuccess({ body, status });
        } else {
          const res = { body, status };
          // FIXME: poor handling practice
          handleBankError(res, res);
        }
      })
      .catch((error) => {
        handleBankError(error);
      })
      .finally(() => {
        setDelayedResponseText("");
      });
  };

  const handleAPIErrorWithRetry = async (error, res) => {
    if (error?.response?.status == 504) {
      handleAPIResponseDelay();
    } else {
      handleBankError(error, res);
    }
  };

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
      .then((responseJson) => {
        console.log("kyc/bank-verify-account responseJson: ", responseJson);
        handleBankSuccess(responseJson)
        setLoading(false);
      })
      .catch((error) => {
        console.log({bankError123: error})
        handleAPIErrorWithRetry(error);
      });
  };

  return (
    <>
      {delayedResponseText ? (
        <InfoCard
          info={delayedResponseText}
          icon="beenhere"
          color={COLORS.primary}
        />
      ) : (
        <></>
      )}
      <PrimaryButton
        accessibilityLabel={"BankFormBtn"}
        title={loading ? "Verifying" : strings.continue}
        disabled={props.disabled}
        loading={loading}
        onPress={() => {
          goForFetch();
        }}
      />
    </>
  );
};

export default BankVerifyApi;
