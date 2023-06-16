import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import Success from "../../assets/congratulations.svg";
import LogoHeader from "../../components/atoms/LogoHeader";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import whatsappLinking from "../../helpers/WhatsappLinking";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import Analytics, {InteractionTypes} from "../../helpers/analytics/commonAnalytics";

const WelcomePage = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Login") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          whatsappLinking();
        }}
      />

      <View style={styles.container}>
        <Success style={{ alignSelf: "center", width: "70%" }} />
        <View style={{ flex: 1 }} />

        <Text
          style={[styles.subHeadline, { width: "90%", alignSelf: "center" }]}
        >
          <Text style={{ color: COLORS.warning }}>{strings.congrats}!</Text>{" "}
          {"\n"}
          {strings.phoneVerificationSuccess}
        </Text>
        <Text
          style={[
            styles.headline,
            {
              ...FONTS.h3,
              width: "90%",
              alignSelf: "center",
              marginBottom: 20,
            },
          ]}
        >
          {strings.completeEkyc}
        </Text>
        <PrimaryButton
          title="Start eKYC"
          accessibilityLabel="WelcomeBtn"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "WelcomePage",
            action: "",
            status: ""
            });
            navigation.navigate("ProfileForm");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
