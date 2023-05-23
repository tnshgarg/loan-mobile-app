import { useDispatch, useSelector } from "react-redux";
import { Alert, Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { addVerifyStatus } from "../../store/slices/bankSlice";
import { form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "../../helpers/analytics/commonAnalytics";
import FuzzyCheck from "../../components/molecules/FuzzyCheck";
import DetailsCard from "../../components/molecules/DetailsCard";
import { addOnboarded } from "../../store/slices/authSlice";
import { putBackendData } from "../../services/employees/employeeServices";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );
  const data = useSelector((state) => state.bank.data);

  const backendPush = async ({ verifyStatus }) => {

    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      accountNumber: data.accountNumber,
      verifyStatus: verifyStatus,
      campaignId: campaignId,
    };

    const response = await putBackendData({ data: payload, xpath: "bank", token: token });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
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
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }

  };

  const cardData = () => {
    var res = [
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
      <Text style={styles.headline}>Are these your Bank Account details?</Text>
      <Text style={styles.subHeadline}>
        कृपया स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?
      </Text>
      <DetailsCard data={cardData()} />

      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <Button
          title="Not Me"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          titleStyle={{ ...FONTS.h4, color: COLORS.warning }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
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
        <Button
          accessibilityLabel="BankYesBtn"
          title="Yes, that’s me"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color={COLORS.primary}
          titleStyle={{ ...FONTS.h4, color: COLORS.primary }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            dispatch(addOnboarded(true));
            backendPush({
              verifyStatus: "SUCCESS",
            });
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Bank",
              action: "Confirm",
              status: "Success"
            });
          }}
        />
      </View>
    </View>
  );
};

export default BankConfirmApi;
