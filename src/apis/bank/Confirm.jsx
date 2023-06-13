import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import DetailsCard from "../../components/molecules/DetailsCard";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  useGetBankQuery,
  useUpdateBankMutation,
} from "../../store/apiSlices/bankApi";
import { addOnboarded } from "../../store/slices/authSlice";
import { addVerifyStatus } from "../../store/slices/bankSlice";
import { form, styles } from "../../styles";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: bankData, isLoading: loading } = useGetBankQuery(
    unipeEmployeeId,
    {
      pollingInterval: 1000 * 60 * 60 * 24,
    }
  );
  const { data, number, verifyStatus } = bankData ?? {};

  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const [updateBank] = useUpdateBankMutation();
  const backendPush = async ({ verifyStatus }) => {
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
        if (verifyStatus === "REJECTED") {
          if (props?.route?.params?.type === "KYC") {
            navigation.navigate("KYC", {
              screen: "BANK",
              params: {
                screen: "Form",
              },
            });
          } else {
            navigation.navigate("BankForm");
          }
        } else if (verifyStatus === "SUCCESS") {
          if (props?.route?.params?.type === "KYC") {
            navigation.navigate("KYC", {
              screen: "BANK",
            });
          } else {
            navigation.replace("EWA_MANDATE");
          }
        }
      })
      .catch((error) => {
        showToast(error?.message, "error");
      });
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

  return (
    <View style={styles.container}>
      <DetailsCard data={cardData()} />

      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <PrimaryButton
          title="Not Me"
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h3, color: COLORS.black }}
          onPress={() => {
            backendPush({
              verifyStatus: "REJECTED",
            });
            analytics().logEvent("Bank_Confirm_Error", {
              unipeEmployeeId: unipeEmployeeId,
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
            analytics().logEvent("Bank_Confirm_Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          }}
        />
      </View>
    </View>
  );
};

export default BankConfirmApi;
