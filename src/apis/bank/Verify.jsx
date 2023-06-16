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
import { useVerifyBankMutation } from "../../store/apiSlices/bankApi";
import Analytics, {InteractionTypes} from "../../helpers/analytics/commonAnalytics";
import { getBackendData } from "../../services/employees/employeeServices";
import { KYC_RETRY_WAIT_TIME } from "../../services/constants";
import InfoCard from "../../components/atoms/InfoCard";
import { COLORS } from "../../constants/Theme";
import { asyncTimeout } from "../../helpers/asyncTimer";

const BankVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [delayedResponseText, setDelayedResponseText]= useState("");

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
        component: "Bank",
        action: "Verify",
        status: "Success"
      });
      setLoading(false);
  }

  const handleBankError = (error, res) => {
    dispatch(addVerifyStatus("ERROR"));
    Alert.alert("verifyBankAccount API Catch Error", JSON.stringify(error));
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      component: "Bank",
      action: "Verify",
      status: "Error",
      error: `verifyBankAccount API Catch Error: ${JSON.stringify(error)}, ${JSON.stringify(res)}`,
    });
    setLoading(false);
  }

  const handleAPIResponseDelay = async () => {
    setDelayedResponseText("We are still getting your details please wait....")
    await asyncTimeout(KYC_RETRY_WAIT_TIME);
    // TODO: replace with rtk-call
    getBackendData({ 
      params: { unipeEmployeeId: unipeEmployeeId }, 
      xpath: "bank", 
      token: token  
    }).then(
      ({data: {body, status}}) => {
        if (status == 200 && body?.verifyStatus == "INPROGRESS_CONFIRMATION") {
          handleBankSuccess({body, status})
        } else {
          const res = {body, status}
          // FIXME: poor handling practice
          handleBankError(res, res)
        }
      }
    ).catch(error => {
      handleBankError(error)
    }).finally(() => {
      setDelayedResponseText("")
    })
  }
  
  const handleAPIErrorWithRetry = async (error, res) => {
    if (error?.response?.status == 504) {
      handleAPIResponseDelay()
    } else {
      handleBankError(error, res);
    }
  }

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
        const responseJson = res?.data;
        console.log("kyc/bank-verify-account responseJson: ", responseJson);
        try {
          if (responseJson?.status === 200) {
            handleBankSuccess(responseJson)
          } else {
            throw responseJson;
          }
        } catch (error) {
          handleBankError(error, res)
        }
        setLoading(false);
      })
      .catch((error) => {
        handleAPIErrorWithRetry(error)
      });
  };

  return (
    <>
    {delayedResponseText ? <InfoCard info={delayedResponseText} icon="beenhere" color={COLORS.primary}/> : <></>}
    <PrimaryButton
      accessibilityLabel={"BankFormBtn"}
      title={loading ? "Verifying" : "Continue"}
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
