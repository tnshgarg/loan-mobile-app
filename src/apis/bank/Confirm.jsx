import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/atoms/Loading";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DetailsCard from "../../components/molecules/DetailsCard";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { kycNavigate } from "../../services/kyc/navigation";
import { useUpdateBankMutation } from "../../store/apiSlices/bankApi";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addOnboarded } from "../../store/slices/authSlice";
import { addVerifyStatus } from "../../store/slices/bankSlice";
import { form, styles } from "../../styles";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const [awatingSubmit, setAwaitingMutation] = useState(false);
  const { bank: bankData } = kycData ?? {};

  const { data, number, verifyStatus } = bankData ?? {};

  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [updateBank] = useUpdateBankMutation();
  const backendPush = async ({ verifyStatus }) => {
    setAwaitingMutation(true);
    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      accountNumber: data.accountNumber,
      verifyStatus: verifyStatus,
      campaignId: campaignId,
    };

    updateBank(payload)
      .unwrap()
      .then((res) => {
        if (["REJECTED", "SUCCESS"].includes(verifyStatus)) {
          kycNavigate({ ...kycData, bank: { verifyStatus } }, navigation);
        } else {
          const err = new Error("Something Unexpected has happened");
          err.message = "Something Unexpected has happened";
          throw err;
        }
      })
      .catch((error) => {
        showToast(error?.message, "Please contact support");
      })
      .finally(() => setAwaitingMutation(false));
  };

  const cardData = () => {
    let res = [
      {
        subTitle: "Account Holder Name",
        value: data?.accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Account Number",
        value: data?.accountNumber,
      },
      { subTitle: "Bank Name", value: data?.bankName },
      { subTitle: "Branch Name", value: data?.branchName, fullWidth: true },
      { subTitle: "Branch City", value: data?.branchCity },

      { subTitle: "IFSC", value: data?.ifsc },
      { subTitle: "UPI", value: data?.upi, fullWidth: true },
    ];
    return res;
  };

  let loading = kycLoading || awatingSubmit;

  return (
    <View style={styles.safeContainer}>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                display: loading ? "none" : null,
              },
            ]}
          >
            <PrimaryButton
              title="Not Me"
              containerStyle={form.noButton}
              titleStyle={{ ...FONTS.h3, color: COLORS.black }}
              onPress={() => {
                backendPush({
                  verifyStatus: "REJECTED",
                });
                Analytics.trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  component: "Bank",
                  action: "Confirm",
                  status: "Error",
                  error: "Rejected by User",
                });
              }}
            />
            <FuzzyCheck name={data?.accountHolderName} step="Bank Account" />
            <PrimaryButton
              accessibilityLabel="BankYesBtn"
              title="Yes, that’s me"
              containerStyle={form.yesButton}
              titleStyle={{ ...FONTS.h3, color: COLORS.white }}
              onPress={() => {
                dispatch(addOnboarded(true));
                backendPush({
                  verifyStatus: "SUCCESS",
                });
                Analytics.trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  component: "Bank",
                  action: "Confirm",
                  status: "Success",
                });
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default BankConfirmApi;
