import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { SafeAreaView, Text, View, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import LogoHeader from "../../components/atoms/LogoHeader";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import SvgListItem from "../../components/molecules/SvgListItem";
import { COLORS, FONTS } from "../../constants/Theme";
import whatsappLinking from "../../helpers/WhatsappLinking";
import { requestUserPermission } from "../../services/notifications/notificationService";
import { onboardingStyles, styles } from "../../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Onboarding = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: "0% Interest Charges",
      imageUri: (
        <MaterialCommunityIcons
          name="check-circle"
          size={32}
          color={COLORS.primary}
        />
      ),
    },
    {
      title: "No Joining Fees",
      imageUri: (
        <MaterialCommunityIcons
          name="check-circle"
          size={32}
          color={COLORS.primary}
        />
      ),
    },
    {
      title: "Instant cash in bank account",
      imageUri: (
        <MaterialCommunityIcons
          name="check-circle"
          size={32}
          color={COLORS.primary}
        />
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          whatsappLinking();
        }}
      />
      <View style={styles.container}>
        <View style={[styles.container, { padding: "5%" }]}>
          <Text
            style={{
              ...FONTS.title,
              color: COLORS.primary,
            }}
          >
            नमस्ते
          </Text>

          <Text
            style={{ ...FONTS.h1, color: COLORS.secondary, marginBottom: "5%" }}
          >
            Get your salary today!
          </Text>

          {data.map((item, index) => (
            <SvgListItem item={item} key={index} />
          ))}
        </View>

        <View style={{ flex: 4 }} />

        <PrimaryButton
          title="Get Started Now"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              component: "Onboarding",
              action: "GetStarted",
              status: "",
            });
            navigation.navigate("Login");
          }}
        />
        <ShieldTitle title="100% Secure" />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
