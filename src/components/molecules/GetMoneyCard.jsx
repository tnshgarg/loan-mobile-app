import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import Coin from "../../assets/Coin.svg";
import Hourglass from "../../assets/Hourglass.svg";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../../store/apiSlices/mandateApi";
import PrimaryButton from "../atoms/PrimaryButton";
import SvgContainer from "../atoms/SvgContainer";

const GetMoneyCard = ({ navigation, eligible, amount, accessible }) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });
  const {
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
    kycCompleted,
  } = kycData ?? {};

  const { data, error, isLoading } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 10,
  });

  console.log("Mandate Error:", error);

  const mandateVerifyStatus = data?.verifyStatus;
  console.log({ mandateVerifyStatus });

  const BUTTON_TEXT = {
    kycNotCompleted:
      "Verify your identity and complete your full KYC process to withdraw advance salary.",
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {kycCompleted && mandateVerifyStatus == "SUCCESS" ? (
            <SvgContainer height={20} width={20}>
              <Coin />
            </SvgContainer>
          ) : (
            <SvgContainer height={20} width={20}>
              <Hourglass />
            </SvgContainer>
          )}
          {/* TODO: add localization */}
          <Text style={[styles.text, { marginLeft: 10 }]}>
            {kycCompleted
              ? mandateVerifyStatus != "SUCCESS"
                ? "Setup Repayment for Advance Salary"
                : strings.withDrawAdvanceSalary
              : strings.kycPending}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{strings.availableSalary}</Text>
        <Text style={[styles.text, { ...FONTS.body1 }]}>
          {kycCompleted ? amount : "XX,XXX"}
        </Text>

        <PrimaryButton
          containerStyle={{ height: 40 }}
          title={
            kycCompleted
              ? !accessible
                ? strings.offerInactive
                : !eligible
                ? strings.offerInactive
                : strings.getSalaryNow
              : "Complete Your KYC"
          }
          disabled={!kycCompleted ? false : !eligible || !accessible}
          onPress={() => {
            if (kycCompleted && mandateVerifyStatus == "SUCCESS") {
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "GetMoneyCard",
                action: `navigate:EWAStack:EWA_OFFER`,
                status: "",
              });
              navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
            } else if (mandateVerifyStatus != "SUCCESS") {
              navigation.navigate("EWAStack", {
                screen: "EWA_MANDATE",
                params: { previousScreen: "HomeStack" },
              });
            } else {
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "GetMoneyCard",
                action: `navigate:KycProgress`,
                status: "",
              });
              navigation.navigate("KycProgress");
            }
          }}
        />
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor:
            kycCompleted && mandateVerifyStatus == "SUCCESS"
              ? COLORS.primaryBackground
              : COLORS.pendingBackground,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {/* TODO: add localization */}
        <Text style={styles.text}>
          {kycCompleted
            ? mandateVerifyStatus != "SUCCESS"
              ? "Kindly register mandate for seamless advance salary experience and to make repayments on time."
              : `${strings.transfer} ${amount} ${strings.toBankAccount}`
            : strings.verifyYourIdentity}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    // padding: "15rem",
    flexDirection: "column",
    borderRadius: 10,

    backgroundColor: "#f5f9f9",
  },
  text: { ...FONTS.body4, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;
