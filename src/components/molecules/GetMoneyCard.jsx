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
import { EWA_POLLING_DURATION, KYC_POLLING_DURATION } from "../../services/constants";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../../store/apiSlices/mandateApi";
import PrimaryButton from "../atoms/PrimaryButton";
import SvgContainer from "../atoms/SvgContainer";

const USER_STAGE = {
  KYC_PENDING: 0,
  MANDATE_PENDING: 1,
  EWA_AVAILABLE: 2
}
const US = USER_STAGE
const getUserStage = (kycCompleted, mandateVerifyStatus) => {
  if (!kycCompleted) {
    return USER_STAGE.KYC_PENDING
  }
  if (mandateVerifyStatus != "SUCCESS") {
    return USER_STAGE.MANDATE_PENDING
  } 
  return USER_STAGE.EWA_AVAILABLE
}
const GetMoneyCard = ({ navigation, eligible, amount, accessible }) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });
  const {
    kycCompleted,
  } = kycData ?? {};

  const { data, error, isLoading } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: EWA_POLLING_DURATION,
  });

  console.log("Mandate Error:", data, error);

  const mandateVerifyStatus = data?.verifyStatus;
  console.log({ mandateVerifyStatus });

  const userStage = getUserStage(kycCompleted, mandateVerifyStatus)
  const BUTTON_TEXT = {
    kycNotCompleted:
      "Verify your identity and complete your full KYC process to withdraw advance salary.",
  };

  const cardTopMessages = {
    [US.KYC_PENDING]: strings.kycPending,
    [US.MANDATE_PENDING]: strings.setupRepayment,
    [US.EWA_AVAILABLE]: strings.withDrawAdvanceSalary,
  }

  const cardBottomMessages = {
    [US.KYC_PENDING]: strings.verifyYourIdentity,
    [US.MANDATE_PENDING]: strings.kindlySetupRepayment,
    [US.EWA_AVAILABLE]: `${strings.transfer} ${amount} ${strings.toBankAccount}`,
  }
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
          {userStage == USER_STAGE.EWA_AVAILABLE ? (
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
            {cardTopMessages[userStage]}
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
            if (userStage == US.EWA_AVAILABLE) {
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "GetMoneyCard",
                action: `navigate:EWAStack:EWA_OFFER`,
                status: "",
              });
              navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
            } else if (userStage == US.MANDATE_PENDING) {
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
            userStage == US.EWA_AVAILABLE
              ? COLORS.primaryBackground
              : COLORS.pendingBackground,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {/* TODO: add localization */}
        <Text style={styles.text}>
          {cardBottomMessages[userStage] }
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
